const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5000;
app.use(cors());

// function getPostgresIPAddress() {
//   try {
//     const { execSync } = require("child_process");
//     const ipAddress = execSync(
//       `docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}" my-postgres`
//     )
//       .toString()
//       .trim();
//     return ipAddress;
//   } catch (error) {
//     console.error("Error getting PostgreSQL IP address:", error);
//     return null;
//   }
// }

const pool = new Pool({
  user: "postgres",
  host: "172.17.0.2",
  // host: getPostgresIPAddress(),
  // host: "localhost",
  // host: "my-postgres",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
});

// API endpoint to fetch data
app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
