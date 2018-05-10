const nodemailer = require('nodemailer');

module.exports = {
  send(mailer, email) {
    const { user, pass, from } = mailer;
    const {
      to, subject, text, html,
    } = email;
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.exmail.qq.com',
        port: 465,
        pool: true,
        secure: true,
        auth: {
          user,
          pass,
        },
      });

      const mailOptions = {
        from,
        to,
        subject,
        text,
      };

      if (text) Object.assign(mailOptions, { text });
      if (html) Object.assign(mailOptions, { html });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) reject(error);
        else resolve(info);
      });
    });
  },
};
