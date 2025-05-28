const db = require('../database/config');

function inserirAvaliacao(dados) {
    const instrucao = `
        INSERT INTO avaliacao (
            nota_enredo,
            nota_trilha_sonora,
            nota_atuacao,
            nota_direcao,
            nota_fotografia,
            momento,
            fk_usuario,
            fk_filme
        ) VALUES (
            ${dados.nota_enredo},
            ${dados.nota_trilha_sonora},
            ${dados.nota_atuacao},
            ${dados.nota_direcao},
            ${dados.nota_fotografia},
            now(),
            ${dados.fk_usuario},
            ${dados.fk_filme}
        );
    `;
    return db.executar(instrucao);
}

// funções para exibir na dashboard:
// essa função retorna a média geral de cada filme. Obs: o join foi feito pra pegar o título do filme.
function mediaPorFilme() {
    const instrucao = `
        SELECT 
            f.id as fk_filme,
            f.titulo as nome_filme,
            AVG(
                (a.nota_enredo + a.nota_trilha_sonora + a.nota_atuacao + a.nota_direcao + a.nota_fotografia) / 5
            ) as media_geral
        FROM avaliacao a
        JOIN filme f ON a.fk_filme = f.id
        GROUP BY f.id, f.titulo
        ORDER BY media_geral DESC;
    `;
    return db.executar(instrucao);
}

// essa função retorna a média de cada critério de avaliação por filme.
function mediasCriterioPorFilme() {
    const instrucao = `
        SELECT 
            f.titulo AS nome_filme,
            AVG(a.nota_enredo) AS media_enredo,
            AVG(a.nota_trilha_sonora) AS media_trilha,
            AVG(a.nota_atuacao) AS media_atuacao,
            AVG(a.nota_direcao) AS media_direcao,
            AVG(a.nota_fotografia) AS media_foto
        FROM avaliacao AS a
        JOIN filme AS f ON a.fk_filme = f.id
        GROUP BY f.titulo;
    `;
    return db.executar(instrucao);
}


module.exports = {
    inserirAvaliacao,
    mediaPorFilme,
    mediasCriterioPorFilme
};

