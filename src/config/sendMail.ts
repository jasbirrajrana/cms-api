import sgMail from "@sendgrid/mail";

const gridKey = process.env.SEND_GRID_KEY!;
sgMail.setApiKey(gridKey);

export const sendMailForConfirmation = async (email: string, url: string) => {
  await sgMail
    .send({
      to: email,
      from: process.env.EMAIL_ID!,
      subject: "Welcome to blog*",
      html: `<a href="${url}">${url}</a>`, // html body
    })
    .then(() => {
      console.log("send!!");
    });
};
let config:any="j";
console.log(config)