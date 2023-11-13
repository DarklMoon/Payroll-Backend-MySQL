const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "project-service.ctyetg9uawza.ap-southeast-2.rds.amazonaws.com",
  user: "root",
  password: "ikfIjN-23412ddasd+3d",
  database: "payroll_service",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;