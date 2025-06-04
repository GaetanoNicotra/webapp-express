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
        // ciclo l'array per sovrascirvere il valore della propietà img
        const film = results.map((film) => {
            const obj = {
                ...film,
                image: req.imagePath + film.image
            }
            return obj
        })
        res.json(film)
    })
}

// rotta show
const show = (req, res) => {
    const { id } = req.params;
    const filmsql = `SELECT movies.* , ROUND(AVG(reviews.vote)) AS average_vote
    FROM movies
    JOIN reviews ON reviews.movie_id = movies.id
    WHERE movies.id = ?
    GROUP BY movies.id`

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
            // aggiungo la media per il singolo libro
            film.reviews = reviewsResults;
            // aggiungo la media dei voti
            film.average_vote = parseInt(film.average_vote);

            res.json({ ...film, image: req.imagePath + film.image })
        })
    })
}

// rotta per l'inserimento di una nuova recensione
const storeReview = (req, res) => {
    // recupero l'id
    const { id } = req.params;

    // recupero i dati delle recensioni dal body request (postman)
    const { name, vote, text } = req.body;

    // creo la query
    const sql = "INSERT INTO reviews (name, vote, text, movie_id) VALUES (?,?,?,?)"

    // eseguo la query
    connection.query(sql, [name, vote, text, id], (err, result) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.status(201).json({ message: "Recensione aggiunta con successo", id: result.insertId })
    })
}

// esporto le rotte 
module.exports = { index, show, storeReview };