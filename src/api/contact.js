// api/contact.js
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Optional: simple spam protection -- reject very long messages
    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    // Compose email
    const msg = {
      to: process.env.TO_EMAIL,          // your email
      from: process.env.FROM_EMAIL,     // verified sender (SendGrid)
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await sendgrid.send(msg);

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Contact API error:', err);
    // avoid leaking provider details
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
