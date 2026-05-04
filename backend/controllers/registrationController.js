const { pool } = require('../config/db');

exports.submitRegistration = async (req, res) => {
  const { service_id, full_name, phone, email, notes } = req.body;
  try {
    await pool.queryWrapper(
      'INSERT INTO registrations (service_id, full_name, phone, email, notes) VALUES ($1, $2, $3, $4, $5)',
      [service_id || null, full_name, phone, email, notes]
    );
    res.status(201).json({ message: 'Qeydiyyat uğurla tamamlandı' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server xətası' });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const { rows } = await pool.queryWrapper(`
      SELECT r.*, s.title as service_title 
      FROM registrations r 
      LEFT JOIN services s ON r.service_id = s.id 
      ORDER BY r.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server xətası' });
  }
};

exports.updateRegistrationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.queryWrapper('UPDATE registrations SET status = $1 WHERE id = $2', [status, id]);
    res.json({ message: 'Status yeniləndi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server xətası' });
  }
};

exports.deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.queryWrapper('DELETE FROM registrations WHERE id = $1', [id]);
    res.json({ message: 'Qeydiyyat silindi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server xətası' });
  }
};
