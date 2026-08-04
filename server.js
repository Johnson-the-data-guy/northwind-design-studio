if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ quiet: true });
}

const express = require('express');
const path = require('path');
const session = require('express-session');
const { passport } = require('./config/passport');
const ensureAuthenticated = require('./middleware/ensureAuthenticated');
const authRoutes = require('./routes/auth');
const checkoutRoutes = require('./routes/checkout');
const PRICING = require('./config/pricing');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

if (!process.env.SESSION_SECRET) {
  console.warn('SESSION_SECRET is not set — using an insecure development-only fallback. Set it in .env before deploying.');
}

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-only-insecure-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/checkout', checkoutRoutes);

const NAV_LINKS = [
  { text: 'Features', href: '#features' },
  { text: 'How it works', href: '#how-it-works' },
  { text: 'Pricing', href: '#pricing' },
  { text: 'Customers', href: '#testimonials' }
];

const CLIENTS = [
  {
    name: 'Juicyway',
    icon: '<svg viewBox="0 0 24 24"><path d="M12 3c3 4 5 7.2 5 10a5 5 0 1 1-10 0c0-2.8 2-6 5-10Z" fill="currentColor"/></svg>'
  },
  {
    name: 'Milk & Bean',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 8h9l-1 9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z"/><path d="M15 9h2a2 2 0 0 1 0 4h-2"/></svg>'
  },
  {
    name: 'CrateBox',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"><path d="M4 8l8-4 8 4-8 4-8-4Z"/><path d="M4 8v8l8 4 8-4V8"/><path d="M12 12v8"/></svg>'
  },
  {
    name: 'OrbitalScale',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="3.6" ry="9"/></svg>'
  },
  {
    name: 'PulseCheck',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>'
  },
  {
    name: 'Roadrunner',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h4l3-10h4l3 10h4"/><path d="M9.5 17h5" stroke-dasharray="1.6 2.2"/></svg>'
  }
];

const FEATURES = [
  {
    title: 'Feedback in context',
    body: 'Every comment lands as a pin directly on the design, threaded and timestamped — no more screenshots pasted into email.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M4 5h16v11H9l-4 4V5Z"/><circle cx="9" cy="10.5" r="0.75" fill="currentColor" stroke="none"/><circle cx="12" cy="10.5" r="0.75" fill="currentColor" stroke="none"/><circle cx="15" cy="10.5" r="0.75" fill="currentColor" stroke="none"/></svg>'
  },
  {
    title: 'Live collaboration',
    body: 'Watch cursors move and comments appear the instant a client responds — reviews happen in minutes, not days.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M6 3l6 15 2.4-6.6L21 9 6 3Z"/></svg>'
  },
  {
    title: 'One-click approvals',
    body: 'Turn stakeholder sign-off into a single click, with a permanent, versioned audit trail attached to every deliverable.',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>'
  }
];

const STEPS = [
  {
    title: 'Upload your work',
    body: 'Drop in Figma files, PDFs, or images — or link a live prototype. Northwind keeps every version in one timeline.'
  },
  {
    title: 'Clients comment in context',
    body: 'Reviewers pin notes directly on the design, reply in threads, and @mention teammates without leaving the page.'
  },
  {
    title: 'Approve & hand off',
    body: 'A single approval locks the final version and generates a shareable record — no more “wait, who signed off on this?”'
  }
];

const TESTIMONIALS = [
  {
    quote: 'Northwind cut our revision cycles in half. Clients actually enjoy leaving feedback now.',
    name: 'Priya Chandra',
    title: 'Creative Director, Juicyway'
  },
  {
    quote: 'The approval trail alone justified the switch — no more chasing sign-off over email.',
    name: 'Marcus Webb',
    title: 'Ops Lead, Roadrunner Logistics'
  },
  {
    quote: 'Our clients feel like part of the process instead of waiting for a big reveal.',
    name: 'Sasha Kowalski',
    title: 'Founder, Milk & Bean'
  }
];

app.get('/', (req, res) => {
  res.render('index', {
    navLinks: NAV_LINKS,
    clients: CLIENTS,
    features: FEATURES,
    steps: STEPS,
    pricing: PRICING,
    testimonials: TESTIMONIALS,
    year: new Date().getFullYear(),
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || ''
  });
});

app.get('/portfolio', (req, res) => {
  res.json({
    projects: [
      { name: 'Riverside Cafe Rebrand', year: 2024 },
      { name: 'Aldergrove Festival Poster Series', year: 2023 },
      { name: 'Marrow & Co. Packaging', year: 2023 }
    ]
  });
});

app.get('/contact', (req, res) => {
  res.json({
    email: 'hello@northwinddesignstudio.example',
    phone: '+1-555-0142',
    address: '12 Harbor Street, Northwind City'
  });
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.user });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Northwind Design Studio server listening on port ${PORT}`);
  });
}

module.exports = app;
