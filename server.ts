import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'https://piyushj.dev' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// check if server has connected successfully
app.get('/', (req: Request, res: Response) => {
    res.json('Backend running');
});

// send message route
app.post('/send-message', async (req: Request, res: Response) => {
    // get form contents
    const { firstName, lastName, email, message } = req.body;

    try {
        // auth transporter for gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
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
        console.error('Error sending email:', err);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});
