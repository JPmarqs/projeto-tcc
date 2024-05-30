const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('./db');
db.connect();

async function selectCadastro() {
    const client = await db.connect();
    const res = await client.query('SELECT * FROM "users"');

    return res.rows;
}

//Registration Function
async function insertCadastro(usuario) {
    const client = await db.connect();
    let retorno = 0;
    try {
        const data = await client.query(`SELECT * FROM users WHERE "EMAIL"= $1;`, [
            usuario.EMAIL,
        ]); //Checking if user already exists
        const arr = data.rows;
        if (arr.length != 0) {
            retorno = 400;
          return retorno;
        } else {
          bcrypt.hash(usuario.senha, 10, (err, hash) => {
            if (err)
              res.status(err).json({
                error: "Server error",
              });
            const user = {
              nome: usuario.nome,
              email: usuario.email,
              senha: hash,
            };
            var flag = 1; //Declaring a flag
    
            //Inserting data into the database
    
            client.query(
              `INSERT INTO users ("NOME", "EMAIL", "SENHA") VALUES ($1,$2,$3);`,
              [user.nome, user.email, user.senha],
              (err) => {
                if (err) {
                  flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                  console.error(err);
                  retorno = 500;
                  return retorno;
                } else {
                  flag = 1;
                  retorno = 201;
                    return retorno;
                }
              }
            );
            if (flag) {
              const token = jwt.sign(
                //Signing a jwt token
                {
                  email: user.EMAIL,
                },
                process.env.SECRET_KEY
              );
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
}

module.exports = {
   insertCadastro,
   selectCadastro
}
