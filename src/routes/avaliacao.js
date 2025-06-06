const express = require('express');
const router = express.Router();

const avaliacaoController = require('../controllers/avaliacaoController');

router.post('/avaliacoes', avaliacaoController.cadastrar);

//rotas para dashboard:
router.get("/mediaPorFilme", avaliacaoController.obterMediaPorFilme);
router.get("/mediasCriterioPorFilme", avaliacaoController.obterMediasCriterioPorFilme);


// rota para KPI
router.get('/todasAvaliacoes', avaliacaoController.listarTodasAvaliacoes);

module.exports = router;
