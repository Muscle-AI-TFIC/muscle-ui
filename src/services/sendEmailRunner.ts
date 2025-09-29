import sendEmail from './sendEmailNotfication';

async function run() {
  const success = await sendEmail({
    subject: process.env.EMAIL_SUBJECT || 'Build Complete',
    body: process.env.EMAIL_CONTENT || 'Seu job terminou com sucesso.',
    toEmail: process.env.EMAIL_DEST || 'destino@gmail.com',
  });

  if (!success) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
