const User = require('../models/user.model');
const Session = require('../models/session.model');
const APIError = require('../utils/APIError');
const utils = require('../utils/util')
const email = require('../utils/sendEmail');
// const sms = require('../utils/sendSms');
const uuidv4 = require('uuid/v4');
const config = require('../config/vars');

exports.getAuthCode = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let session = await Session.findOne({ $or: [ { "address.email": body.id }, { "address.number": body.id } ] });
            if (session) {
                if (session[ 'otp' ][ 'lastTime' ] - 3570000 > Date.now()) {
                    return reject(new APIError({ message: 'OTP already send, please wait 30 sec.', status: 400 }));
                }
            }
            let sessionSchema = {};
            let otp = {
                code: Math.floor(1000 + Math.random() * 9000),
                status: 'NOT_USED',
                lastTime: Date.now() + 3600000
            }
            sessionSchema[ 'userid' ] = uuidv4();
            sessionSchema[ 'address' ] = {};
            sessionSchema[ 'otp' ] = otp
    
            if (/\S+@\S+\.\S+/.test(body.id)) {
                sessionSchema[ 'address' ][ 'email' ] = body.id;
            } else {
                sessionSchema[ 'address' ][ 'number' ] = body.id;
            }
            if(sessionSchema['address']['email']){
                email.sendVerifyEmail(sessionSchema['address']['email'], sessionSchema[ 'otp' ]['code']);
            } else {
                // sms.sendVerifySMS(sessionSchema['address']['number'], sessionSchema[ 'otp' ]['code']);
            }
            if (session) {
                sessionSchema[ 'userid' ] = session.userid;
                await Session.findOneAndUpdate({ userid: session.userid }, sessionSchema);
            } else {
                const session = new Session(sessionSchema);
                await session.save();
            }
    
            let result = {};
            result.status = "success";
            result.message = "OTP sent successfully.";
            result.data = {};
            return resolve(result);
        } catch (error) {
            return reject(error)
        }
    })
}

exports.auth = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({ userid: body.userid });
            if (!user) return reject(new APIError({ message: config.errorlang.UNKNOWN, status: 400 }));
            let result = {};
            result.status = "success";
            result.message = "User is authenticated";
            result.data = user;
            return resolve(result);
        } catch (error) {
            return reject(error)
        }
    })
}

exports.logout = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne({ userid: body.userid });
            if (!user) return reject(new APIError({ message: config.errorlang.UNKNOWN, status: 400 }));
            await Session.findOneAndUpdate(
                { userid: body.userid },
                { isLoggedIn: false }
            );
            let result = {};
            result.status = "success";
            result.message = "Successfully logged out";
            return resolve(result);
        } catch (error) {
            return reject(error)
        }
    })
}

exports.confirmAuthCode = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const session = await Session.findOne({ $or: [ { "address.email": body.id }, { "address.number": body.id } ] });
            if (!session) { return reject(new APIError({ message: config.errorlang.UNKNOWN, status: 400 })); }
            if (!session || !session[ 'otp' ][ 'code' ]) { return reject(new APIError({ message: config.errorlang.LINK_EXPIRED, status: 400 })); }
            if (session[ 'otp' ][ 'lastTime' ] < Date.now())  { return reject(new APIError({ message: config.errorlang.LINK_EXPIRED, status: 400 })); }
            if (session[ 'otp' ][ 'code' ] != body.otp)  { return reject(new APIError({ message: config.errorlang.INVALID_OTP, status: 400 })); }
            await Session.updateOne({ userid: session.userid }, { 'otp.code': null, 'otp.status': 'SUCCESS', isLoggedIn: true });

            let user = await User.findOne({ userid: session.userid });
            if (!user) {
                const new_user = {};
                new_user[ 'userid' ] = session[ 'userid' ];
                new_user[ 'address' ] = session[ 'address' ];
                const user = await new User(new_user);
                user.save();
            }
            let token = await utils.createJWT({ userid: session.userid });
            let result = {};
            result.token = token;
            result.status = "success";
            result.message = "Authorized Successfully";
            return resolve(result);
        } catch (error) {
            return reject(error)
        }
    })
}