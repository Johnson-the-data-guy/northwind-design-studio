const PRICING = [
  {
    slug: 'starter',
    name: 'Starter',
    price: '$19',
    period: '/mo',
    unitAmount: 1900,
    description: 'For freelancers and solo designers.',
    features: ['3 active projects', 'Unlimited client reviewers', '30-day version history', 'Email support'],
    highlighted: false,
    cta: 'Start free trial'
  },
  {
    slug: 'studio',
    name: 'Studio',
    price: '$49',
    period: '/mo',
    unitAmount: 4900,
    description: 'For growing design teams.',
    features: ['Unlimited projects', 'Custom-branded client portal', 'Full version history', 'One-click approvals', 'Priority support'],
    highlighted: true,
    cta: 'Start free trial'
  },
  {
    slug: 'agency',
    name: 'Agency',
    price: '$129',
    period: '/mo',
    unitAmount: 12900,
    description: 'For multi-team agencies.',
    features: ['Everything in Studio', 'Multiple workspaces', 'Single sign-on (SSO)', 'Dedicated success manager'],
    highlighted: false,
    cta: 'Talk to sales'
  }
];

module.exports = PRICING;
