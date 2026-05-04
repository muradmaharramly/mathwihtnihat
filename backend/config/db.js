require('dotenv').config();

const isPostgres = !!process.env.DATABASE_URL;

let db;

if (isPostgres) {
  const { Pool } = require('pg');
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  console.log('Connected to PostgreSQL (Neon)');
  
  db.queryWrapper = async (text, params) => {
    return db.query(text, params);
  };
} else {
  const sqlite3 = require('sqlite3').verbose();
  db = new sqlite3.Database('./math_portfolio.sqlite', (err) => {
    if (err) console.error('SQLite connection error', err);
    else console.log('Connected to SQLite database locally');
  });

  db.queryWrapper = (text, params = []) => {
    return new Promise((resolve, reject) => {
      // Postgres parameters $1, $2 to SQLite ?
      const sqliteText = text.replace(/\$\d+/g, '?');
      
      const isSelectOrReturning = text.trim().toUpperCase().startsWith('SELECT') || text.includes('RETURNING');
      
      if (isSelectOrReturning) {
        db.all(sqliteText, params, function(err, rows) {
          if (err) reject(err);
          else resolve({ rows: rows || [] });
        });
      } else {
        db.run(sqliteText, params, function(err) {
          if (err) reject(err);
          else resolve({ rows: [], lastID: this.lastID, changes: this.changes });
        });
      }
    });
  };
}

module.exports = { pool: db, isPostgres };
