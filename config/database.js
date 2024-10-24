const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "g-tech",
  port: 3306,
  connectTimeout: 60000,
});

connection.connect((err) => {
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

  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log('Table "constants" created successfully.');
  });
});

module.exports = connection;
