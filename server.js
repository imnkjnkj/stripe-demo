const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51PpThmCUiGonhVtH5K8SGF3tqmBSRutJrCOhFN4xE9X5s2po9Di46j35QYSrjjJCsiI4CCGKWjmQnUDMNsrzokZi00pO2psv2c');

app.use(express.static("public"));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const amount = 1000;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));``