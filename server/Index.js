// index.js
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Function to get OAuth Token
const getOAuthToken = async () => {
    const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    return response.data.access_token;
};

// Lipa Na Mpesa Online STK Push request
app.post("/mpesa/stkpush", async (req, res) => {
    try {
        const token = await getOAuthToken();
        const timestamp = new Date().toISOString().replace(/-|T|:|Z|\.\d+/g, '');
        const mpesaData = {
            BusinessShortCode: process.env.BUSINESS_SHORTCODE,
            Password: Buffer.from(`${process.env.BUSINESS_SHORTCODE}${process.env.PASSKEY}${timestamp}`).toString('base64'),
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: req.body.amount,
            PartyA: req.body.phone,
        PartyB: process.env.BUSINESS_SHORTCODE,
            PhoneNumber: req.body.phone,
                CallBackURL: process.env.CALLBACK_URL,
                    AccountReference: "CompanyXYZ",
                        TransactionDesc: "Payment for XYZ service",
        };

    const response = await axios.post(process.env.LIPA_NA_MPESA_ONLINE_URL, mpesaData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',  // Ensure the content type is set
        },
    });

    res.json(response.data);
} catch (error) {
    console.error("Error processing M-Pesa request:", error.message); // Log the error message for debugging
    res.status(500).json({ error: error.response ? error.response.data : "Internal Server Error" });
}
});

// M-Pesa callback endpoint
app.post("/callback", (req, res) => {
    console.log("Callback from M-Pesa:", req.body);
    // Process the payment confirmation here
    res.status(200).json({ message: "Callback received successfully" });
});

// Ensure the log statement reflects the correct port
app.listen(3002, () => {
    console.log("Server is running on port 3002");
});
