const mysql = require("mysql");

const db = mysql.createConnection({
  host: "gtech.c5i6oqis88l0.eu-central-1.rds.amazonaws.com",
  user: "root",
  password: "Mis@Gtech24",
  database: "g-tech",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS constants (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      value DECIMAL(10, 2) NOT NULL
    );  
  `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log('Table "constants" created successfully.');
  });
});

module.exports = db;
