# Portfolio Website Backend

This backend service is built with Node.js and Express to handle contact form submissions from the portfolio website. It uses Nodemailer to forward messages to a designated email address.

---

## Technologies Used

- Node.js
- Express.js
- Nodemailer
- Validator
- CORS

---

## Overview

The backend accepts the user's first name, last name, email, and message from the frontend contact form. Inputs are then sanitised and validated to ensure security and data integrity. Valid messages are sent to the portfolio owner’s email via Gmail SMTP.

---

## Environment Configuration

The application requires the following environment variables to authenticate with Gmail:
- USER_EMAIL: your_email@gmail.com
- USER_PASSL your_email_app_password

Credentials are stored securely using environment variables and are never hardcoded.

---

## API Endpoint

**POST /send-message**

- Expects JSON with `firstName`, `lastName`, `email`, and `message`.
- Validates the email format and sanitises all inputs.
- Returns HTTP 200 on success.
- Returns HTTP 400 if the email is invalid.
- Returns HTTP 500 if sending the email fails.

---

## Deployment

Hosted on Railway, with environment variables managed through the Railway dashboard. CORS is restricted to allow requests only from the portfolio frontend domain.

---

## Additional Notes

- Input sanitisation is performed using the Validator library.
- Nodemailer is configured with secure SMTP using port 465.
- Error handling returns appropriate HTTP status codes to the client.
