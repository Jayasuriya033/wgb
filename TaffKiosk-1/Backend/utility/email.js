import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD 
  },
});

export const sendSignupEmail = async (to, username, password) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: 'Signup Successful in TaffKiosk',
    text: `Your account has been created successfully.\n\nUsername: ${username}\nPassword: ${password}\n\nPlease keep this information secure.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Signup email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
