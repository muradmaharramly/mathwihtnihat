const { pool } = require('../config/db');

const getSettings = async (req, res) => {
  try {
    const { rows } = await pool.queryWrapper('SELECT * FROM settings');
    const settings = rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {});
    res.json(settings);
  } catch (error) {
    console.error('DB Error:', error.message);
    res.json({});
  }
};

const getServices = async (req, res) => {
  try {
    const { rows } = await pool.queryWrapper('SELECT * FROM services ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('DB Error:', error.message);
    res.json([]);
  }
};

const getPrices = async (req, res) => {
  try {
    const { rows } = await pool.queryWrapper(`
      SELECT p.*, s.title as service_title 
      FROM prices p 
      JOIN services s ON p.service_id = s.id
      ORDER BY p.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('DB Error:', error.message);
    res.json([]);
  }
};

const getAdvantages = async (req, res) => {
  try {
    const { rows } = await pool.queryWrapper('SELECT * FROM advantages ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('DB Error:', error.message);
    res.json([]);
  }
};

const getTestimonials = async (req, res) => {
  try {
    const { rows } = await pool.queryWrapper('SELECT * FROM testimonials ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('DB Error:', error.message);
    res.json([]);
  }
};

const getFaqs = async (req, res) => {
  try {
    const { rows } = await pool.queryWrapper('SELECT * FROM faqs ORDER BY id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSocialMedia = async (req, res) => {
  try {
    const { rows } = await pool.queryWrapper('SELECT * FROM social_media ORDER BY id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSettings,
  getServices,
  getPrices,
  getAdvantages,
  getTestimonials,
  getFaqs,
  getSocialMedia,
};
