const db = require('./db');
db.connect();

async function selectAllConsultas() {
    const client = await db.connect();
    const res = await client.query(
        'SELECT cons."IDCONSULTA", cons."DATACON", cons."SITUACAOCON", med."NOMEMED", paci."NOMEPACI" FROM "CONSULTAS" as cons ' +
        'JOIN "MEDICOS" as med ON cons."IDMEDICOCON" = med."IDMEDICO" ' +
        'JOIN "PACIENTES" as paci ON cons."IDPACIENTECON" = paci."IDPACIENTE" '
    );
    return res.rows;
}

async function selectConsultasFuturas() {
    const client = await db.connect();
    const res = await client.query(
        'SELECT cons."DATACON", cons."SITUACAOCON", med."NOMEMED", paci."NOMEPACI" FROM "CONSULTAS" as cons ' +
        'JOIN "MEDICOS" as med ON cons."IDMEDICOCON" = med."IDMEDICO" ' +
        'JOIN "PACIENTES" as paci ON cons."IDPACIENTECON" = paci."IDPACIENTE" '+
        'WHERE NOW()::timestamp <= cons."DATACON" '
    );

    return res.rows;
}

async function selectConsultasPorMedico(id) {
    const client = await db.connect();
    const res = await client.query(
        'SELECT cons."DATACON", cons."SITUACAOCON", med."NOMEMED", paci."NOMEPACI" FROM "CONSULTAS" as cons ' +
        'JOIN "MEDICOS" as med ON cons."IDMEDICOCON" = med."IDMEDICO" ' +
        'JOIN "PACIENTES" as paci ON cons."IDPACIENTECON" = paci."IDPACIENTE" '+
        'WHERE med."IDMEDICO" = $1', [id]
    );
    return res.rows;
}

async function selectConsultasPorPaciente(id) {
    const client = await db.connect();
    const res = await client.query(
        'SELECT cons."DATACON", cons."SITUACAOCON", med."NOMEMED", paci."NOMEPACI" FROM "CONSULTAS" as cons ' +
        'JOIN "MEDICOS" as med ON cons."IDMEDICOCON" = med."IDMEDICO" ' +
        'JOIN "PACIENTES" as paci ON cons."IDPACIENTECON" = paci."IDPACIENTE" '+
        'WHERE paci."IDPACIENTE" = $1', [id]
    );
    return res.rows;
}

async function selectConsultasPorPacienteEMedico(idMedico, idPaciente) {
    const client = await db.connect();
    const res = await client.query(
        'SELECT cons."DATACON", cons."SITUACAOCON", med."NOMEMED", paci."NOMEPACI" FROM "CONSULTAS" as cons ' +
        'JOIN "MEDICOS" as med ON cons."IDMEDICOCON" = med."IDMEDICO" ' +
        'JOIN "PACIENTES" as paci ON cons."IDPACIENTECON" = paci."IDPACIENTE" '+
        'WHERE med."IDMEDICO" = $1 and paci."IDPACIENTE" = $2', [idMedico, idPaciente]
    );
    return res.rows;
}

async function selectByIdConsultas(id) {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "CONSULTAS" WHERE "IDCONSULTA"=$1', [id]);

    return res.rows;
}

async function insertConsultas(consulta) {

    const sql = 'INSERT INTO "CONSULTAS"( ' +
        '"IDPACIENTECON", "IDMEDICOCON", "DATACON", "SITUACAOCON", "OBSERVCON" ) ' +
        ' VALUES ($1, $2, $3, $4, $5 );';

    const values = [
        consulta.IDPACIENTECON,
        consulta.IDMEDICOCON,
        consulta.DATACON,
        consulta.SITUACAOCON,
        consulta.OBSERVCON,

    ]

    const client = await db.connect();
    await client.query(sql, values);
}

async function updateConsultas(id, consulta) {

    const sql = 'UPDATE "CONSULTAS" SET ' +
        '"IDPACIENTECON"= $1, "IDMEDICOCON"= $2, "DATACON"= $3, "SITUACAOCON"= $4, "OBSERVCON"= $5 ' +
        ' WHERE "IDCONSULTA" = $6';

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

async function deleteConsultas(id) {

    const sql = 'DELETE FROM "CONSULTAS" ' +
        ' WHERE "IDCONSULTA" = $1 ';

    const values = [
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

module.exports = {
    selectAllConsultas,
    selectConsultasFuturas,
    selectConsultasPorMedico,
    selectConsultasPorPaciente,
    selectConsultasPorPacienteEMedico,
    selectByIdConsultas,
    insertConsultas,
    updateConsultas,
    deleteConsultas,
}