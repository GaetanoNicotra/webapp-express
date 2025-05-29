const express = require('express')

// definisco la variabile router
const router = express.Router();

// importo il controller
const filmController = require('../controllers/filmsController');


// definisco le rotte

// index
router.get('/', filmController.index)

// show
router.get('/', filmController.show)