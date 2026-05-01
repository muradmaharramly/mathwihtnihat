const { pool } = require('./config/db');

async function testSM() {
  try {
    const insert = await pool.queryWrapper(
      "INSERT INTO social_media (platform, icon, url) VALUES ('Instagram', 'FiInstagram', 'https://instagram.com/mathwithnihat') RETURNING *"
    );
    console.log("Inserted:", insert.rows[0]);
    
    const select = await pool.queryWrapper("SELECT * FROM social_media");
    console.log("Selected:", select.rows);
  } catch (e) {
    console.error(e);
  }
}
testSM();
