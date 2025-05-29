const connection = require('../data/db')
const notFound = require('../middlewears/notFound')

// rotta index
const index = (req, res) => {
    // recupero tuti i posts dal db
    const sql = "SELECT * FROM movies"

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'database query failed' + err })
        }
        console.log(results)
        res.json(results)
    })
}

// rotta show
const show = (req, res) => {
    const { id } = req.params;
    const filmsql = "SELECT * FROM movies WHERE id = ?"

    // query per le recensioni del film con l'id cercato
    const reviewsSql = `
    SELECT * 
    FROM reviews 
    WHERE movie_id = ?
`
    // eseguo la query 
    connection.query(filmsql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failed' + err })

        // verifico se non trovo il film

        if (results.length === 0 || results[0].id === null) return notFound(null, res, null)

        // eseguo la query per recuperare le recensioni
        const film = results[0]
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'database query failed' + err })

        })
        res.json(results)
    })
}

// esporto le rotte 
module.exports = { index, show }