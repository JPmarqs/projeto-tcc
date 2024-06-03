const db = require('./db');
db.connect();

async function selectMedicos() {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "MEDICOS"');

    return res.rows;
}

async function selectByIdMedicos(id) {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "MEDICOS" WHERE "IDMEDICO"=$1', [id]);
    
    return res.rows;
}


async function insertMedicos(medico) {

    const sql = 'INSERT INTO "MEDICOS"( ' +
        '"NOMEMED", "ESPECIMED", "TELMED", "EMAILMED", "HRINICIOMED", "HRFIMMED") ' +
        ' VALUES ($1, $2, $3, $4, $5, $6);';

    const values = [
        medico.NOMEMED,
        medico.ESPECIMED,
        medico.TELMED,
        medico.EMAILMED,
        medico.HRINICIOMED,
        medico.HRFIMMED,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

async function updateMedicos(id, medico) {

    const sql = 'UPDATE "MEDICOS" SET ' +
        '"NOMEMED"=$1, "ESPECIMED"=$2, "TELMED"=$3, "EMAILMED"=$4, "HRINICIOMED"=$5, "HRFIMMED"=$6 '+
        'WHERE "IDMEDICO"=$7';

    const values = [
        medico.NOMEMED,
        medico.ESPECIMED,
        medico.TELMED,
        medico.EMAILMED,
        medico.HRINICIOMED,
        medico.HRFIMMED,
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}


async function deleteMedicos(id) {

    const sql = 'DELETE FROM "MEDICOS" ' +
        'WHERE "IDMEDICO" = $1 ';

    const values = [
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

module.exports = {
    selectMedicos,
    selectByIdMedicos,
    insertMedicos,
    updateMedicos,
    deleteMedicos,
}