import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }

  try {
    await sgMail.send({
      to: 'seu-email@exemplo.com',
      from: 'noreply@linhadiretanews.com',
      subject: 'Novo Inscrito na Newsletter',
      text: `Novo inscrito: ${email}`,
      html: `<p>Novo inscrito: <strong>${email}</strong></p>`,
    });

    res.status(200).json({ message: 'Email enviado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
