import * as nodemailer from 'nodemailer';

interface EmailOptions {
  subject: string;
  body: string;
  toEmail: string;
}

async function sendEmail({ subject, body, toEmail }: EmailOptions): Promise<boolean> {
  const fromEmail = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASS;

  if (!fromEmail || !password) {
    console.error('EMAIL_USER ou EMAIL_PASS não definidos');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: fromEmail, pass: password },
  });

  try {
    await transporter.verify();

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject,
      text: body,
    });

    console.log('E-mail enviado com sucesso');
    return true;

  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return false;
  }
}

export default sendEmail;
