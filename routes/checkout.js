const express = require('express');
const { stripeClient, stripeEnabled } = require('../config/stripe');
const PRICING = require('../config/pricing');

const router = express.Router();
const BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3000';

router.post('/subscribe/:tier', async function (req, res, next) {
  const tier = PRICING.find(function (t) { return t.slug === req.params.tier; });

  if (!tier) {
    return res.status(404).send('Unknown pricing tier.');
  }

  if (!stripeEnabled) {
    return res.status(503).send(
      "Stripe isn't configured yet. Set STRIPE_SECRET_KEY (see .env.example) to enable checkout."
    );
  }

  try {
    const session = await stripeClient.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `Northwind ${tier.name} plan` },
            unit_amount: tier.unitAmount,
            recurring: { interval: 'month' }
          },
          quantity: 1
        }
      ],
      success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/checkout/cancel`
    });

    res.redirect(303, session.url);
  } catch (err) {
    next(err);
  }
});

router.get('/success', function (req, res) {
  res.render('checkout-success', { sessionId: req.query.session_id || null });
});

router.get('/cancel', function (req, res) {
  res.render('checkout-cancel');
});

module.exports = router;
