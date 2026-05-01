const { pool } = require('./config/db');

async function check() {
  try {
    await pool.queryWrapper("UPDATE testimonials SET role = 'Valideyn' WHERE id = (SELECT MAX(id) FROM testimonials)");
    console.log("Updated last testimonial to Valideyn");
  } catch (e) {
    console.error(e);
  }
}
check();
