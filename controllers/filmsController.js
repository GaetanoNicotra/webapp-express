const connection = require('../data/db')

// rotta index
const index = (req, res) => {
    // recupero tuti i posts dal db
    const sql = "SELECT * FROM movies"

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'database query failed' })
        }
        console.log(results)
        res.json(results)
    })
}

// rotta show
const show = (req, res) => {
    console.log('dettaglio film')
}

// esporto le rotte 
module.exports = { index, show }