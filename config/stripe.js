const Stripe = require('stripe');

const stripeEnabled = Boolean(process.env.STRIPE_SECRET_KEY);
const stripeClient = stripeEnabled ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

module.exports = { stripeClient, stripeEnabled };
