const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, () => {
    console.log('>>>>>>>> started');
});