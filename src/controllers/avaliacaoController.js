const avaliacaoModel = require('../models/avaliacaoModel');

function cadastrar(req, res) {
    const {
        nota_enredo,
        nota_trilha_sonora,
        nota_atuacao,
        nota_direcao,
        nota_fotografia,
        momento,
        fk_usuario,
        fk_filme
    } = req.body;

    if (!nota_enredo || !nota_trilha_sonora || !nota_direcao || !nota_fotografia || !fk_usuario || !fk_filme) {
        return res.status(400).send("Campos obrigatórios faltando!");
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
    .then(() => {
        res.status(200).send("Avaliação cadastrada com sucesso!");
    })
    .catch((erro) => {
        console.error(erro);
        res.status(500).json(erro.sqlMessage || erro.message);
    });
}

// função para gerar na dash:
function obterMediaPorFilme(req, res) {
    avaliacaoModel.mediaPorFilme()
        .then((resultado) => res.json(resultado))
        .catch((erro) => {
            console.error(erro);
            res.status(500).json(erro.sqlMessage || erro.message);
        });
}

// função para gerar na dash:
function obterMediasCriterioPorFilme(req, res) {
    avaliacaoModel.mediasCriterioPorFilme()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar médias por filme: ", erro);
            res.status(500).json(erro);
        });
}


module.exports = {
    cadastrar,
    obterMediaPorFilme,
    obterMediasCriterioPorFilme
};
