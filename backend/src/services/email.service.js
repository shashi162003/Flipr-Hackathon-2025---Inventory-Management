const axios = require('axios');
require('dotenv').config();
const colors = require('colors');

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const sendEmail = async (to, subject, htmlContent) => {
    try {
        const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTUwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxzdHlsZT4uaGVhdnkgeyBmb250OiBib2xkIDIwcHggc2Fucy1zZXJpZjsgfSAubGlnaHQgeyBmb250OiAxOHB4IHNhbnMtc2VyaWY7IH08L3N0eWxlPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGM0Y0RjYiLz4KICA8dGV4dCB4PSIxMCIgeT0iMjciIGNsYXNzPSJoZWF2eSIgZmlsbD0iIzFGMjkzNyI+SW52PC90ZXh0PgogIDx0ZXh0IHg9IjQ1IiB5PSIyNyIgY2xhc3M9ImxpZ2h0IiBmaWxsPSIjNEI1NTYzIj5UcmFjazwvdGV4dD4KICA8cGF0aCBkPSJNMTIwIDEwIEwxNDAgMTAgTDEzMCAyMCBaIiBmaWxsPSIjM0I4MkY2IiAvPgogIDxwYXRoIGQPSJNMTIwIDMwIEwxNDAgMzAgTDEzMCAyMCBaIiBmaWxsPSIjOTNDNUZEIiAvPgo8L3N2Zz4=";

        const masterHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #f8f8f8; padding: 20px; text-align: center;">
                    <img src="${logoSrc}" alt="InvTrack Logo" style="width: 150px;">
                </div>
                <div style="padding: 20px;">
                    ${htmlContent}
                </div>
                <div style="background-color: #f8f8f8; color: #777; padding: 10px 20px; text-align: center; font-size: 12px;">
                    <p>&copy; ${new Date().getFullYear()} InvTrack. All rights reserved.</p>
                </div>
            </div>
        `;

        const payload = {
            sender: {
                name: "InvTrack",
                email: process.env.MAIL_FROM
            },
            to: [
                {email: to}
            ],
            subject: subject,
            htmlContent: masterHtml
        };

        const headers = {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
        };

        const response = await axios.post(BREVO_API_URL, payload, { headers });

        console.log((`Email sent via Brevo: ${response.data.messageId}`).green);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`Error sending email via Brevo: ${error.response.status} ${error.response.statusText}`.red);
            console.error('Brevo Error Details:'.red, JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.error('Error sending email: No response received from Brevo.'.red, error.request);
        } else {
            console.error(`Error sending email: ${error.message}`.red);
        }

        throw new Error("Email could not be sent.");
    }
}

module.exports = sendEmail;