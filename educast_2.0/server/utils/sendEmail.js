import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "educast052844@gmail.com",
    pass: "zdkpcfhhebhbbsih",
  },
});

const verifyEmail = async (userEmail, token) => {
  try {
    let info = await transporter.sendMail({
      from: "educast052844@gmail.com",
      to: userEmail,
      subject: "Verify Account",
      html: "http://localhost:3000/verifyEmail/" + userEmail + "/" + token,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

export default verifyEmail;
