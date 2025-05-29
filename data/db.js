// importo mysql2
const mysql = require('mysql2');

// creo una variabile per la connesione al database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// utilizzo la variabile per stabilire una connessione
connection.connect((err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('connessione avvenuta con successo')
    }
});

module.exports = connection