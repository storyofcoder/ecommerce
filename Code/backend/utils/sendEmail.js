const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const config = require('../config/vars');
const { google } = require('googleapis');

const googleProject = config.globalConfig.sesSetting.nodemailer();
const oAuth2Client = new google.auth.OAuth2(googleProject.auth.clientId, googleProject.auth.clientSecret, 'https://developers.google.com/oauthplayground');

// Send e-mail using SMTP
exports.sendVerifyEmail = async (email, otp) => {
  oAuth2Client.setCredentials({ refresh_token: googleProject.auth.refreshToken });
  const accessToken = await oAuth2Client.getAccessToken();
  const smtpTransporter = nodemailer.createTransport(config.globalConfig.sesSetting.nodemailer(accessToken));
  const inviteTemplate = path.resolve(__dirname, `../templates/emailers/verify.ejs`);
  const templateString = fs.readFileSync(inviteTemplate, 'utf-8');
  const final_body = ejs.render(templateString, {
    code: otp
  });
  const mailOptions = {
    from: config.globalConfig.sesSetting.fromEmail,
    to: email,
    html: final_body,
  };
  mailOptions.subject = 'E Com Verify Email';
  smtpTransporter.sendMail(mailOptions, callback);
}

function callback(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + info.response);
  }
}
