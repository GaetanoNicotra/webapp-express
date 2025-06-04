const express = require('express');

// definisco la variabile router
const router = express.Router();

// importo il controller
const filmController = require('../controllers/filmsController');


// definisco le rotte

// index
router.get('/', filmController.index);

// show
router.get('/:id', filmController.show);

// store review
router.post('/:id/review', filmController.storeReview)

// esporto il router
module.exports = router;