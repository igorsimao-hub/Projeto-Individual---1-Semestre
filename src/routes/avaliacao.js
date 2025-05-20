const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacaoController');

router.post('/avaliacoes', avaliacaoController.cadastrar);

module.exports = router;
