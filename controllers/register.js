const bcrypt = require("bcryptjs");
const db = require("../data/db");
const jwt = require("jsonwebtoken");

//Registration Function

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const client = await db.connect();
    const data = await client.query(`SELECT * FROM users WHERE "EMAIL"= $1;`, [
      email,
    ]); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(senha, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          nome,
          email,
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
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              flag = 1;
              res
                .status(200)
                .send({ message: "User added to database, not verified" });
            }
          }
        );
        if (flag) {
          const token = jwt.sign(
            //Signing a jwt token
            {
              email: user.email,
            },
            process.env.SECRET_KEY
          );
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }
};
