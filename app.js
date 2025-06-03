// importo express
const express = require('express');

// inizializzo express in una variabile
const app = express();

// importo il pacchetto delle cors policy
const cors = require('cors');

// numero di porta
const port = process.env.SERVER_PORT || 3000;

// importo il router
const filmsRouter = require('./routers/filmRouter');

// importo i custom middleware
const errorsHandler = require('./middlewears/errorsHandler');
const notFound = require("./middlewears/notFound");

// importo il middelware per le img
const imagePathmdlw = require('./middlewears/imagePath');

// utilizzo il middelware per le cors policy
app.use(cors(({ origin: process.env.FE_APP })));

// uso i middleware per gli asset statici
app.use(express.static('public'));

// middleware per il parsing del body req
app.use(express.json());

// uso il middleware per le immagini
app.use(imagePathmdlw);

// definisco l'entry point
app.get('/', (req, res) => {
    res.send('Books API server')
});

//utilizzo il router
app.use('/api/films', filmsRouter);

// utilizzo i midelware degli errori
app.use(errorsHandler)
app.use(notFound)

// metto in ascolto il server
app.listen(port, () => {
    console.log('server in ascolto alla porta 3000')
});