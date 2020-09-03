const express = require('express');
const app = express()
var db = require("./database.js")
const bodyParser = require("body-parser");
const primesController = require('./controllers/primesController.js');
const pairController = require("./controllers/pairsController");
const port = 3000


//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Primes request
app.get('/primes', primesController.primes);
app.get('/primessave', primesController.primesSaves);
app.get('/showprimes', primesController.showPrimes);

//Pairs request
app.get('/pairs', pairController.pairs);
app.get('/pairssave', pairController.pairsSave);
app.get('/showpairs', pairController.showPairs);

app.set('view engine', 'pug');
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})