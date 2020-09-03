var db = require("../database.js")
const { primeNumber } = require("../utils/isPrime");

exports.primes = (req, res) => {
    const { n } = req.query;
    if (n === undefined) {
        res.send({ message: "Introduzca un valor para los n numeros primos" });
    }
    const primeArray = [],
        count = 0,
        result = generateNumbers(parseInt(n), primeArray, count);

    res.send({ result: JSON.stringify(result) });
};

const generateNumbers = (n, primeArray, count) => {
    if (primeNumber(count)) {
        primeArray.push(count);
    }

    if (primeArray.length === n) {
        return primeArray;
    }

    count += 1;
    return generateNumbers(n, primeArray, count);
};

exports.primesSaves = (req, res) => {
    const { n } = req.query;
    if (n === undefined) {
        res.send({ message: "Introduzca un valor para los n numeros primos" });
    }

    var sql = "select * from primes ORDER BY number ASC";
    var params = []
    db.all(sql, params,  (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        const oldRows = rows.filter(data => data.n === parseInt(n));
        if (oldRows.length === 0) {
            const primeArray = [];
            const count = 0;
            res.send({
                "message": "success",
                "data": JSON.stringify(generateNumbers(parseInt(n), primeArray, count))
            })
        }
        
        res.json({
            "message": "success",
            "data": oldRows
        });
        

    });
};

const generateNumbersDB = (n, primeArray, count) => {
    if (primeNumber(count)) {
        var insert = 'INSERT INTO primes (n, number) VALUES (?,?)';
        db.run(insert, [n, count])

        primeArray.push(count);
    }
    if (primeArray.length === n) {
        return primeArray;
    }

    count += 1;
    return generateNumbersDB(n, primeArray, count);
};

exports.showPrimes = (req, res) => {
    var sql = "select * from primes ORDER BY number ASC";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
};