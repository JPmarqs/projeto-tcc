const db = require('./db');
db.connect();

async function selectPacientes() {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "PACIENTES"');

    return res.rows;
}

async function selectByIdPacientes(id) {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "PACIENTES" WHERE "IDPACIENTE"=$1', [id]);
    
    return res.rows;
}

async function insertPacientes(paciente) {

    const sql = 'INSERT INTO "PACIENTES"( ' +
        '"NOMEPACI", "DATANASPACI", "GENPACI", "ENDERPACI", "CIDADEPACI", "UFPACI", "TELPACI", "EMAILPACI") ' +
        ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';

    const values = [
        paciente.NOMEPACI,
        paciente.DATANASPACI,
        paciente.GENPACI,
        paciente.ENDERPACI,
        paciente.CIDADEPACI,
        paciente.UFPACI,
        paciente.TELPACI,
        paciente.EMAILPACI,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

async function updatePacientes(id, paciente) {

    const sql = 'UPDATE "PACIENTES" SET ' +
        '"NOMEPACI"=$1, "DATANASPACI"=$2, "GENPACI"=$3, "ENDERPACI"=$4, "CIDADEPACI"=$5, "UFPACI"=$6, "TELPACI"=$7, "EMAILPACI"=$8 ' +
        ' WHERE "IDPACIENTE" = $9';

    const values = [
        paciente[0].NOMEPACI,
        paciente[0].DATANASPACI,
        paciente[0].GENPACI,
        paciente[0].ENDERPACI,
        paciente[0].CIDADEPACI,
        paciente[0].UFPACI,
        paciente[0].TELPACI,
        paciente[0].EMAILPACI,
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}


async function deletePacientes(id) {

    const sql = 'DELETE FROM "PACIENTES" ' +
        '"IDPACIENTE" = $1 ';

    const values = [
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

module.exports = {
    selectPacientes,
    selectByIdPacientes,
    insertPacientes,
    updatePacientes,
    deletePacientes,
}