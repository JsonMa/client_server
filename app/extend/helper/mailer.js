const nodemailer = require('nodemailer');

module.exports = {
  send(mailer, email) {
    const { user, pass, from } = mailer;
    const {
      to, subject, text, html,
    } = email;
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        pool: true,
        secure: false,
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
