const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const User = require("../models/user");



//fecth user data from the Database
const fetchUserData = async (userID) => {
  try {
    // Fetch user data from the database by iD
    const user = await User.findById(userID); 
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};



// set up transporter
const transporter = nodemailer.createTransport({
  service: "sendinblue",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  host: process.env.MAIL_SERVER,
  port: process.env.MAIL_PORT,
});



const sendVerificationEmail = async (token, email, username) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../views/emails/activate.ejs"
    );
    const html = await ejs.renderFile(templatePath, { token, username });

    await transporter.sendMail({
      from: process.env.DEFAULT_SENDER,
      to: email,
      subject: "Activate your account",
      html: html,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    //throw error;
    return;
  }
};


const sendResetPasswordEmail = async (token, email) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../views/emails/password-reset.ejs"
    );
    const html = await ejs.renderFile(templatePath, { token });

    await transporter.sendMail({
      from: process.env.DEFAULT_SENDER,
      to: email,
      subject: "Password Reset",
      html: html,
    });
  
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};


const sendOrderCompletion = async ( order ) => {
  try {
    const templatePath = path.join(__dirname, "../views/emails/checkin.ejs");


    const { user, items, totalCost, paymentId, paymentMode, createdAt } = order;
    const userData = await fetchUserData(user);

    const html = await ejs.renderFile(templatePath, {
      userData,
      totalCost,
      items,
      paymentId,
      paymentMode,
      createdAt
    });

    await transporter.sendMail({
      from: process.env.ORDER_SENDER,
      to: userData.email,
      subject: `CRM Hospitality Order Summary #${paymentId}`,
      html: html,
    });

    console.log("Order completion email sent successfully.");
  } catch (error) {
    console.error("Error sending order completion email:", error);
    if (
      error.code === "EPROTOCOL" &&
      error.responseCode === 421 &&
      error.response === "421 Service not available"
    ) {
    
      return; 
    }
    //setTimeout(sendOrderCompletionEmail, 60000); // Retry after 1 minute

  }
};



const sendContactFormEmail = async (name, email, phone, subject, message) => {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to: process.env.FEEDBACK_EMAIL,
      subject: "New contact form submission",
      html: `
        <h3>New Equiry Form  Submission </h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Email:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};




module.exports = {
  sendResetPasswordEmail,
  sendContactFormEmail,
  sendVerificationEmail,
  sendOrderCompletion,
};


