const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")("sk_test_51Kcf2eJKbGhXxv9eMZoj41nYErBsNPxAIK9ai7YaVGpsvuvhETAMX4YY3tpcmN9QlUTaFkXbDNhNC1JGLE2o7HyF00K3Dnbzje")

//API

const app = express();

app.use(cors({origin : true}));
app.use(express.json());

app.get("/",(request,response)=>response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log(request)

    console.log("Payment Rquest Received",total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency:"usd",
    });

    response.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})


exports.api = functions.https.onRequest(app);
