const db = require('./db');
db.connect();

async function selectConsultaHistorica() {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "HISTORICO_CONSULTAS"');

    return res.rows;
}

async function selectByIdConsultaHistorica(id) {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "HISTORICO_CONSULTAS" WHERE "IDHISTORICO"=$1', [id]);

    return res.rows;
}

async function insertConsultaHistorica(consulta) {

    const sql = 'INSERT INTO "HISTORICO_CONSULTAS"( ' +
        '"IDPACIENTEHIST", "IDMEDICOHIST", "DATACONSULTAHIST", "DIAGNOSTICOHIST", "OBSERVACOESHIST" ) ' +
        ' VALUES ($1, $2, $3, $4, $5 );';

    const values = [
        consulta.IDPACIENTEHIST,
        consulta.IDMEDICOHIST,
        consulta.DATACONSULTAHIST,
        consulta.DIAGNOSTICOHIST,
        consulta.OBSERVACOESHIST,

    ]

    const client = await db.connect();
    await client.query(sql, values);
}

async function updateConsultaHistorica(id, consulta) {

    const sql = 'UPDATE "HISTORICO_CONSULTAS" SET ' +
        '"IDPACIENTEHIST"= $1, "IDMEDICOHIST"= $2, "DATACONSULTAHIST"= $3, "DIAGNOSTICOHIST"= $4, "OBSERVACOESHIST"= $5 ' +
        ' WHERE "IDHISTORICO" = $6';

    const values = [
        consulta[0].IDPACIENTECON,
        consulta[0].IDMEDICOCON,
        consulta[0].DATACON,
        consulta[0].SITUACAOCON,
        consulta[0].OBSERVCON,
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

async function deleteConsultaHistorica(id) {

    const sql = 'DELETE FROM "HISTORICO_CONSULTAS" ' +
        '"IDHISTORICO" = $1 ';

    const values = [
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

module.exports = {
    selectConsultaHistorica,
    selectByIdConsultaHistorica,
    insertConsultaHistorica,
    updateConsultaHistorica,
    deleteConsultaHistorica,
}