const { pool } = require('./config/db');

async function check() {
  try {
    pool.all('PRAGMA table_info(testimonials)', (err, rows) => {
      console.log(rows);
    });
  } catch (e) {
    console.error(e);
  }
}
check();
