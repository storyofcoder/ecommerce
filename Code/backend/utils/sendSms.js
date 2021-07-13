const config = require('../config/vars');
const client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

exports.sendVerifySMS = async (number, OTP) => {
    try {
        client.messages
            .create({
                to: number,
                from: config.twilio.number,
                body: config.twilio.message(OTP),
            })
            .then(message => console.log(message.sid));
    } catch (error) {
        console.log('error in sending SMS: ', error);
    }
}