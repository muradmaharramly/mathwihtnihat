const { pool, isPostgres } = require('../config/db');
const bcrypt = require('bcryptjs');

const createTables = async () => {
  const serialType = isPostgres ? 'SERIAL' : 'INTEGER';
  
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id ${serialType} PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id ${serialType} PRIMARY KEY,
      category VARCHAR(50) NOT NULL,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS prices (
      id ${serialType} PRIMARY KEY,
      service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
      class_name VARCHAR(50) NOT NULL,
      type VARCHAR(50) NOT NULL,
      price NUMERIC(10, 2) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id ${serialType} PRIMARY KEY,
      student_name VARCHAR(100) NOT NULL,
      review TEXT NOT NULL,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      role VARCHAR(50) DEFAULT 'Tələbə'
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id ${serialType} PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id ${serialType} PRIMARY KEY,
      key VARCHAR(100) UNIQUE NOT NULL,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS advantages (
      id ${serialType} PRIMARY KEY,
      icon VARCHAR(50) NOT NULL,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS social_media (
      id ${serialType} PRIMARY KEY,
      platform VARCHAR(50) NOT NULL,
      icon VARCHAR(50) NOT NULL,
      url TEXT NOT NULL
    );
  `;

  try {
    if (isPostgres) {
       await pool.query(query);
    } else {
       await new Promise((resolve, reject) => {
         pool.exec(query, (err) => {
           if (err) reject(err);
           else resolve();
         });
       });
    }
    console.log('Tables created successfully');
    
    // Add role column if it doesn't exist (safe migration)
    try {
      if (isPostgres) {
        await pool.queryWrapper("ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'Tələbə'");
      } else {
        await pool.queryWrapper("ALTER TABLE testimonials ADD COLUMN role VARCHAR(50) DEFAULT 'Tələbə'");
      }
      console.log('Testimonials role column ensured.');
    } catch (e) {
      // Column likely already exists in SQLite, ignore error
    }

    const { rows } = await pool.queryWrapper('SELECT * FROM users WHERE username = $1', ['admin']);
    if (rows.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash('admin123', salt);
      await pool.queryWrapper('INSERT INTO users (username, password_hash) VALUES ($1, $2)', ['admin', hash]);
      console.log('Default admin user created');
    }
  } catch (err) {
    console.error('Error creating tables', err);
  }
};

createTables();
