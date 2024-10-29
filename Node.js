const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = '0x4AAAAAAAyntAO9YdAsaNJ1-NQ3XtsSfJU'; // Replace with your actual secret key

app.post('/verify-captcha', async (req, res) => {
    const { token } = req.body;

    const response = await fetch(`https://challenges.cloudflare.com/turnstile/v0/siteverify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
        return res.status(200).send('Success');
    } else {
        console.error('Verification failed:', data); // Log the error details
        return res.status(400).send('Failed');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
