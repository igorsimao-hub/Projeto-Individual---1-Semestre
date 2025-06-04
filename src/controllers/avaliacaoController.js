const avaliacaoModel = require('../models/avaliacaoModel');

function cadastrar(req, res) { // REQuisição e RESposta do servidor
    const {
        nota_enredo,
        nota_trilha_sonora,
        nota_atuacao,
        nota_direcao,
        nota_fotografia,
        momento,
        fk_usuario,
        fk_filme
    } = req.body // desestruturação do req.body para pegar todos os valores

    if (!nota_enredo || !nota_trilha_sonora || !nota_direcao || !nota_fotografia || !fk_usuario || !fk_filme) {
        return res.status(400).send("Campos obrigatórios faltando!")
    }

    avaliacaoModel.inserirAvaliacao({
        nota_enredo,
        nota_trilha_sonora,
        nota_atuacao,
        nota_direcao,
        nota_fotografia,
        momento,
        fk_usuario,
        fk_filme
    })
    
   .then(function () {
        res.status(200).send("Avaliação cadastrada com sucesso!");
    })
    .catch(function (erro) {
        console.error(erro);
        res.status(500).json(erro.sqlMessage || erro.message);
    });
}

// função para gerar media na dash:
function obterMediaPorFilme(req, res) {
    avaliacaoModel.mediaPorFilme() // pega o RES do model
        .then(function (resultado) { // quando a consulta da certo
            res.json(resultado)
        })
        .catch(function (erro) {
            console.error(erro)
            res.status(500).json(erro.sqlMessage || erro.message)
        })
}

// função para gerar media por criterio na dash:
function obterMediasCriterioPorFilme(req, res) {
    avaliacaoModel.mediasCriterioPorFilme() // pega a RES do model
        .then(function (resultado) { // quando a consulta da certo
            res.json(resultado)
        })
        .catch(function (erro) {
            console.error("Erro ao buscar médias por filme: ", erro);
            res.status(500).json(erro);
        });
}

// função para gerar na KPI:
function listarTodasAvaliacoes(req, res) {
    avaliacaoModel.listarTodasAvaliacoes() // Pega a RES do model
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro);
        });
}



module.exports = { // essa função exporta outras funções para serem. EX: se alguem usar o cadastrar o Expressa vai vai chamar 'avaliacaoController.cadastrar'
    cadastrar,
    obterMediaPorFilme,
    obterMediasCriterioPorFilme,
    listarTodasAvaliacoes
};