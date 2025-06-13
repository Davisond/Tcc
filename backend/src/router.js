const express = require('express');
const alimentosController = require('./controllers/alimentosController');
const router = express.Router();

router.get('/alimentos', alimentosController.getAll);


module.express = router;