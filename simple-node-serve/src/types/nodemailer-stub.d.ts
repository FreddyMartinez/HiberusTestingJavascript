declare module 'nodemailer-stub' {
  import SendmailTransport from "nodemailer/lib/sendmail-transport";

  type Mail = {
    to: Array<string>;
    content: string;
  };

  class InteractsWithMail {
    lastMail: () => Mail;
    newMail: (mail: Mail) => InteractsWithMail;
    flushMails: () => void;
  }

  const errorTransport: unknown;
  const interactsWithMail: InteractsWithMail;
  const stubTransport: SendmailTransport;

  export {
    errorTransport,
    interactsWithMail,
    stubTransport
  };
}
