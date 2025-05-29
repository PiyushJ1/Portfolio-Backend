const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const validator = require('validator');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'https://piyushj.dev' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// check if server has connected successfully
app.get('/', (req, res) => {
    res.send('Backend is running successfully');
});

// send message route
app.post('/send-message', async (req, res) => {
    // get form contents and validate for security
    const firstName = validator.escape(req.body.firstName || '');
    const lastName = validator.escape(req.body.lastName || '');
    const email = validator.normalizeEmail(req.body.email || '');
    const message = validator.escape(req.body.message || '');

    try {
        // auth transporter for gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        // create message object
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `Message from ${firstName} ${lastName}`,
            text: `From: ${email}\n\nMessage:\n${message}`
        };

        // send mail
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
        // 500 error code: server problem
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});
