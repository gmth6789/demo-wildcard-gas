require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const { sql } = require('@vercel/postgres');
const path = require('path');

// Import the dashboard router
const dashboardRouter = require('./routes/dashboard');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure(path.join(__dirname, '..', 'views'), { 
  autoescape: true,
  express: app,
});



app.get('/', (req, res) => {
  res.render('index.njk', { title: 'Home Page' });
});


app.use('/dashboard', dashboardRouter);

const PORT = 9000;

app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));

module.exports = app;
