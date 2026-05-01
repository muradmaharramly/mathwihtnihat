const { pool } = require('./config/db');

async function testSettingUpdate() {
  const key = 'contact_phone';
  const value = '+994 50 123 45 67';
  try {
    const selectRes = await pool.queryWrapper('SELECT * FROM settings WHERE key = $1', [key]);
    console.log("SELECT result:", selectRes);
    
    if (selectRes.rows && selectRes.rows.length > 0) {
      console.log("Doing UPDATE...");
      await pool.queryWrapper('UPDATE settings SET value = $2 WHERE key = $1', [key, value]);
      console.log("UPDATE successful");
    } else {
      console.log("Doing INSERT...");
      await pool.queryWrapper('INSERT INTO settings (key, value) VALUES ($1, $2)', [key, value]);
      console.log("INSERT successful");
    }
  } catch (error) {
    console.error("DB Error:", error);
  }
}

testSettingUpdate();
