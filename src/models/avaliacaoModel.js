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

module.exports = {
    inserirAvaliacao
};
