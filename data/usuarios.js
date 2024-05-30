const db = require('./db');
db.connect();

async function selectUsuario() {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "USUARIOS"');

    return res.rows;
}

async function selectByIdUsuario(id) {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "USUARIOS" WHERE "IDUSUARIOS"=$1', [id]);

    return res.rows;
}

async function insertUsuario(usuario) {

    const sql = 'INSERT INTO "USUARIOS"( ' +
        '"NOMEUSU", "SENHAUSU", "PERMISAOUSU" ) ' +
        ' VALUES ($1, $2, $3);';

    const values = [
        usuario.NOMEUSU,
        usuario.SENHAUSU,
        usuario.PERMISAOUSU,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

async function updateUsuario(id, usuario) {

    const sql = 'UPDATE "USUARIOS" SET ' +
        '"NOMEUSU"= $1, "SENHAUSU"= $2, "PERMISAOUSU"= $3 ' +
        ' WHERE "IDUSUARIOS" = $4';

    const values = [
        usuario[0].NOMEUSU,
        usuario[0].SENHAUSU,
        usuario[0].PERMISAOUSU,
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

async function deleteUsuario(id) {

    const sql = 'DELETE FROM "USUARIOS" ' +
        '"IDUSUARIOS" = $1 ';

    const values = [
        id,
    ]

    const client = await db.connect();
    await client.query(sql, values);
}

module.exports = {
    selectUsuario,
    selectByIdUsuario,
    insertUsuario,
    updateUsuario,
    deleteUsuario,
}