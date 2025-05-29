const connection = require('../data/db')

// rotta index
const index = (req, res) => {
    console.log('tutti i film')
}

// rotta show
const show = (req, res) => {
    console.log('dettaglio film')
}

// esporto le rotte 
module.exports = { index, show }