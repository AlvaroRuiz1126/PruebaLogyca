var db = require("../database.js")
const {primeNumber} = require("../utils/isPrime");

exports.pairs = (req, res) => {
    const {n} = req.query;
    if(n === undefined){
        res.send({message: "Introduzca un valor para los n parejas de numeros primos"})
    }
    const primeArray = [],
          count = 8,
          result = generatePairs(parseInt(n), primeArray, count);
    
    res.send({result: JSON.stringify(result)});
};

const generatePairs = (n, primeArray, count) => {
    if(n == 1){
        return primeArray.push([3, 5]);
    }

    if(n == 2){
        primeArray.push([3, 5]);
        primeArray.push([5, 7]);

        return primeArray;
    }

    if(primeArray.length === 0){
        primeArray.push([3, 5]);
        primeArray.push([5, 7]);
    }

    if(primeNumber(count)){
        if(count != 2){
            let gemelo = count + 2;
            if(primeNumber(gemelo)){
                primeArray.push([count, gemelo]);
            }
        }
    }

    if(primeArray.length === n){
        return primeArray;
    }

    count += 1;
    return generatePairs(n, primeArray, count);
};

exports.pairsSave = (req, res) => {
    const {n} = req.query;
    if(n === undefined){
        res.send({message: "Introduzca un valor para los n parejas de numeros primos"})
    }

    var sql = "select * from pairs";
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
                "data": JSON.stringify(generatePairs(parseInt(n), primeArray, count))
            })
        }
        //res.setHeader('Content-Type', 'application/json');
        setTimeout(res.json({
            "message": "success",
            "data": oldRows
        }), 5000);
        

    });
    /*const primeArray = [],
          count = 8,
          result = generatePairs(parseInt(n), primeArray, count);
    
    res.send({result: JSON.stringify(result)});*/
};

const generatePairsDB = (n, primeArray, count) => {
    if(n == 1){
        var insert = 'INSERT INTO pairs (pair_number) VALUES (?)';
        db.run(insert, [JSON.stringify([3, 5])])
        return primeArray.push([3, 5]);
    }

    if(n == 2){
        primeArray.push([3, 5]);
        primeArray.push([5, 7]);

        var insert = 'INSERT INTO pairs (pair_number) VALUES (?)';
        db.run(insert, [JSON.stringify([3, 5])])
        db.run(insert, [JSON.stringify([5, 7])])

        return primeArray;
    }

    if(primeArray.length === 0){
        var insert = 'INSERT INTO pairs (pair_number) VALUES (?)';
        db.run(insert, [JSON.stringify([3, 5])])
        db.run(insert, [JSON.stringify([5, 7])])
        primeArray.push([3, 5]);
        primeArray.push([5, 7]);
    }

    if(primeNumber(count)){
        if(count != 2){
            let gemelo = count + 2;
            if(primeNumber(gemelo)){
                var insert = 'INSERT INTO pairs (pair_number) VALUES (?)';
                db.run(insert, [JSON.stringify([count, gemelo])]);

                primeArray.push([count, gemelo]);
            }
        }
    }

    if(primeArray.length === n){
        return primeArray;
    }

    count += 1;
    return generatePairsDB(n, primeArray, count);
};

exports.showPairs = (req, res) => {
    var sql = "select * from pairs";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        const newRows = rows.map(data => JSON.parse(data.pair_number));
        newRows.sort((a, b) => a[0] - b[0]);
        res.json({
            "message":"success",
            "data":newRows
        })
    });
};