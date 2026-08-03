const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const SOCIAL_LINKS = [
  { label: 'Email', href: 'mailto:hello@northwinddesignstudio.example' },
  { label: 'Twitter', href: 'https://twitter.com/northwinddesign' },
  { label: 'Facebook', href: 'https://www.facebook.com/northwinddesignstudio' },
  { label: 'Instagram', href: 'https://www.instagram.com/northwinddesignstudio' }
];

const NAV_LINKS = [
  { text: 'About', href: '/about' },
  { text: 'Video', href: '/video' },
  { text: 'Photo', href: '/photo' },
  { text: 'Home', href: '/' },
  { text: 'Book', href: '/book' }
];

const CATEGORY_TAGS = ['Brands', 'Magazines', 'Personal', 'Beauty', 'Artiste', 'Fashion'];

app.get('/', (req, res) => {
  res.render('index', {
    social: SOCIAL_LINKS,
    navLinks: NAV_LINKS,
    categoryTags: CATEGORY_TAGS,
    year: new Date().getFullYear()
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

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Northwind Design Studio server listening on port ${PORT}`);
  });
}

module.exports = app;
