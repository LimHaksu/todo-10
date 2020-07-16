const dotenv = require("dotenv");
const path = require("path");
const mysql = require("mysql2");

dotenv.config({ path: path.join(__dirname, "../.env") });

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function sendQueries(queries) {
  return new Promise((resolve, reject) => {
    con.connect(function (err) {
      if (err) reject(err);
      console.log("Connected!");

      if (Array.isArray(queries)) {
        Promise.all(
          queries.map((q) => {
            return new Promise((resolve, reject) => {
              con.query(q, (err, result) => {
                if (err) reject(err);
                else resolve(result);
              });
            });
          })
        )
          .then((result) => resolve(result))
          .catch((e) => reject(e));
      } else {
        con.query(queries, (err, result) => {
          if (err) reject(err);
          else {
            resolve(result);
          }
        });
      }
    });
  }).then(() => {
    console.log("Finished!");
    con.close();
  });
}

module.exports = sendQueries;
