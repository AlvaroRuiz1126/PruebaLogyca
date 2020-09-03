var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE primes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            n integer,
            number integer
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                console.log("Se ha creado la tabla de numeros primos");
            }
        });
        
        db.run(`CREATE TABLE pairs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            n integer,
            pair_number text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                console.log("Se ha creado la tabla de pares de numeros primos");
            }
        });
    }
});


module.exports = db;