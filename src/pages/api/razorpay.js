// pages/api/razorpay.js
const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_KEY,
});

export default async function handler(req, res) {
    const payment_capture = 1;
    const amount = 100; // Amount in paisa (INR 1)
    const currency = "INR";

    const options = {
        amount: amount,
        currency: currency,
        receipt: shortid.generate(),
        payment_capture: payment_capture,
        notes: {
            paymentFor: "example_ebook",
            userId: "user_id_here",
            productId: "your_product_id",
        },
    };

    try {
        // Create an order
        const order = await razorpay.orders.create(options);

        // Send the order ID to the frontend
        res.status(200).json({ orderId: order.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating Razorpay order" });
    }
}
