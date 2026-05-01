const { pool } = require('./backend/config/db');

async function check() {
  try {
    const { rows } = await pool.queryWrapper('PRAGMA table_info(testimonials)');
    console.log(rows);
  } catch (e) {
    console.error(e);
  }
}
check();
