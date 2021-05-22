import sgMail from "@sendgrid/mail";

const gridKey = process.env.SEND_GRID_KEY!;
sgMail.setApiKey(gridKey);

export const sendMailForOtp = async (email: string) => {
  let requiredOtp = Math.floor(1000 + Math.random() * 9000);
  console.log(requiredOtp);
  await sgMail
    .send({
      to: email,
      from: process.env.EMAIL_ID!,
      subject: "Welcome to blog*",
      html: `<h1>Your otp is <strong> ${requiredOtp} </strong></h1>`,
    })
    .then(() => {
      console.log("send!!");
    });
  return requiredOtp;
};
