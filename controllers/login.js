const bcrypt = require("bcrypt");

const db = require("../data/db");

const jwt = require("jsonwebtoken");

//Login Function
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const client = await db.connect();
    const data = await client.query(`SELECT * FROM users WHERE "EMAIL"= $1;`, [
      email,
    ]); //Verifying if the user exists in the database
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: 1,
      });
    } else {
      bcrypt.compare(senha, user[0].SENHA, (err, result) => {
        //Comparing the hashed senha
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) {
          //Checking if credentials match
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            message: "User signed in!",
            token: token,
          });
        } else {
          //Declaring the errors
          if (result != true)
            res.status(400).json({
              error: 2,
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};
