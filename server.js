// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// quick ENV check
console.log('▶️  EMAIL_SERVICE=', process.env.EMAIL_SERVICE);
console.log('▶️  EMAIL_USER   =', process.env.EMAIL_USER);
// don't log the pass itself!

// 1) Parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 2) Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// 3) Configure transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // TLS
    secure: false, // use TLS, not SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // sometimes needed in dev
    }
});

// 3a) Verify connection configuration
transporter.verify((err, success) => {
    if (err) console.error('✋ SMTP config error:', err);
    else console.log('✅ SMTP ready to send');
});

// 4) Handle form POST
app.post('/send', async(req, res) => {
    console.log('📬 Form payload:', req.body);

    const { name, email, budget, projectScope } = req.body;
    const website = (req.body.website || '').trim();

    // verify required fields
    if (!name || !email || !budget || !projectScope) {
        return res.status(400).send('Missing required fields');
    }

    // build HTML
    let htmlContent = `
    <h2>New inquiry from Adapted Studios site</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Budget:</strong> ${budget}</p>
    <p><strong>Project Scope:</strong> ${projectScope}</p>
  `;

    if (website) {
        htmlContent += `
      <p><strong>Website:</strong>
        <a href="${website}" target="_blank" rel="noopener">${website}</a>
      </p>
    `;
    }

    const mailOptions = {
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.RECEIVER,
        subject: `New contact from ${name}`,
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✉️  Message sent:', info.messageId);
        return res.redirect('/thank-you.html');
    } catch (err) {
        console.error('❌ Error sending mail:', err);
        return res.status(500).send('Something went wrong. Please try again later.');
    }
});

// 5) Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running: http://localhost:${PORT}`);
});