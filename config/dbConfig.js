import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(process.cdw, '.env');

const dbConnect = mysql2.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

dbConnect.connect((err) => {
  if (err) console.log('mysql connection error:', err);
  else console.log('mysql is connected');
});