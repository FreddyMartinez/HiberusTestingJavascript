import { createTransport } from "nodemailer";
import nodemailerStub from "nodemailer-stub";

export async function sendEmail(email: string, token: string) {
  const transport = createTransport(nodemailerStub.stubTransport);
  await transport.sendMail({
    from: "Test App <sender@test-app.com>",
    to: email,
    subject: "Activation Email",
    html: `Your activation token is ${token}`
  });
}
