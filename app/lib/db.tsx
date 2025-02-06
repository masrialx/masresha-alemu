// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';

// const openDb = async () => {
//   const db = await open({
//     filename: './database.db',
//     driver: sqlite3.Database,
//   });

//   return db;
// };

// // Create table if it doesn't exist
// const createTable = async () => {
//   const db = await openDb();
//   await db.run(`
//     CREATE TABLE IF NOT EXISTS users (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       email TEXT UNIQUE NOT NULL,
//       password TEXT NOT NULL
//     )
//   `);
// };

// createTable();

// export default openDb;
