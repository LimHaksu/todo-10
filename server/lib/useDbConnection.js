const dotenv = require("dotenv");
const path = require("path");
const mysql = require("mysql2/promise");

dotenv.config({ path: path.join(__dirname, "../.env") });

export default async function useDbConnection(asyncQueryFunction) {
  const con = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  asyncQueryFunction(con).finally(() => {
    con.close();
  });
}
