const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url, data = {}) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.data = data;
    this.from = `Piotr Szymanski <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    if (process.env.NODE_ENV === "test") return;

    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      data: this.data,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Witaj w Smart Family!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Twój token do zresetowania hasła (ważny tylko przez 10 minut)"
    );
  }
  async sendChildCodeToParent() {
    await this.send(
      "childCodeToParent",
      "Jednorazowy kod do aktywacji konta Twojego dziecka"
    );
  }
};
