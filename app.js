// importo express
const express = require('express');

// inizializzo express in una variabile
const app = express();

// numero di porta
const port = process.env.SERVER_PORT || 3000;

// uso i middleware per gli asset statici
app.use(express.static('public'));

// middleware per il parsing del body req
app.use(express.json());

// definisco l'entry point
app.get('/', (req, res) => {
    res.send('Books API server')
});

// metto in ascolto il server
app.listen(port, () => {
    console.log('server in ascolto alla porta 3000')
});