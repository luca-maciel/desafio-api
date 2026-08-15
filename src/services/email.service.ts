import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  code: string
) {
  await transporter.sendMail({
    from: `"Auth - forgot password" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Recovery",
    html: `
      <h2>Password Recovery</h2>

      <p>Your verification code is:</p>

      <h1>${code}</h1>

      <p>This code expires in 10 minutes.</p>

      <p>If you didn't request a password reset, ignore this email.</p>
    `,
  });
}