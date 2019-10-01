const { Router } = require('express');
const router = Router();
// User your API Stripe key down here
const stripe = require('stripe')('<API Key Here>');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/checkout', async (req, res) => {
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });
    const charge = await stripe.charges.create({
        amount: "6000",
        currency: "usd",
        customer: customer.id,
        description: 'Videojuego'
    });
    res.render('download');
});

module.exports = router;