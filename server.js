const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Northwind Design Studio</h1><p>Creative work for growing brands.</p>');
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
