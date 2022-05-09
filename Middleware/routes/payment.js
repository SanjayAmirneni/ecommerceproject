const express = require("express");
const stripe = require("stripe")("sk_test_51Kcf2eJKbGhXxv9eMZoj41nYErBsNPxAIK9ai7YaVGpsvuvhETAMX4YY3tpcmN9QlUTaFkXbDNhNC1JGLE2o7HyF00K3Dnbzje")

const router = express.Router();


router.route('/create').post(async (req,res)=>{
    const total = req.body.total;
    // console.log(total)
    // console.log(req.body)
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:"usd",
    });
    res.status(201).send({
        clientSecret:paymentIntent.client_secret,
    })
})


module.exports = router;