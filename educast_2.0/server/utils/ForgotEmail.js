import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "educast052844@gmail.com",
    pass: "zdkpcfhhebhbbsih",
  },
});

const forgotEmail = async (userEmail, userid, token) => {
  try {
    let info = await transporter.sendMail({
      from: "educast052844@gmail.com",
      to: userEmail,
      subject: "Reset Password",
      html: "http://localhost:3000/forgotpassword/" + userid + "/" + token,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

export default forgotEmail;
