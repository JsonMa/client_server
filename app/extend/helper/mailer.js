const nodemailer = require('nodemailer');

module.exports = {
  send(email, subject, html, text) {
    const { user, pass, from } = this.ctx.app.config.mailer;
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
        to: email,
        subject,
        text,
        html,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) reject(error);
        else resolve(info);
      });
    });
  },
};
