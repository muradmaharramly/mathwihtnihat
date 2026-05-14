const { pool } = require('../config/db');

// Settings
const updateSetting = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    const { rows } = await pool.queryWrapper('SELECT * FROM settings WHERE key = $1', [key]);
    if (rows && rows.length > 0) {
      await pool.queryWrapper('UPDATE settings SET value = $1 WHERE key = $2', [value, key]);
    } else {
      await pool.queryWrapper('INSERT INTO settings (key, value) VALUES ($1, $2)', [key, value]);
    }
    res.json({ message: 'Setting updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Services
const createService = async (req, res) => {
  const { category, title, description } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'INSERT INTO services (category, title, description) VALUES ($1, $2, $3) RETURNING *',
      [category, title, description]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;
  const { category, title, description } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'UPDATE services SET category = $1, title = $2, description = $3 WHERE id = $4 RETURNING *',
      [category, title, description, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.queryWrapper('DELETE FROM services WHERE id = $1', [id]);
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Prices
const createPrice = async (req, res) => {
  const { service_id, class_name, type, price } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'INSERT INTO prices (service_id, class_name, type, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [service_id, class_name, type, price]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePrice = async (req, res) => {
  const { id } = req.params;
  const { service_id, class_name, type, price } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'UPDATE prices SET service_id = $1, class_name = $2, type = $3, price = $4 WHERE id = $5 RETURNING *',
      [service_id, class_name, type, price, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePrice = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.queryWrapper('DELETE FROM prices WHERE id = $1', [id]);
    res.json({ message: 'Price removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Advantages
const createAdvantage = async (req, res) => {
  const { icon, title, description } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'INSERT INTO advantages (icon, title, description) VALUES ($1, $2, $3) RETURNING *',
      [icon, title, description]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAdvantage = async (req, res) => {
  const { id } = req.params;
  const { icon, title, description } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'UPDATE advantages SET icon = $1, title = $2, description = $3 WHERE id = $4 RETURNING *',
      [icon, title, description, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAdvantage = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.queryWrapper('DELETE FROM advantages WHERE id = $1', [id]);
    res.json({ message: 'Advantage removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Testimonials
const createTestimonial = async (req, res) => {
  const { student_name, review, rating, role } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'INSERT INTO testimonials (student_name, review, rating, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_name, review, rating, role || 'Tələbə']
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { student_name, review, rating, role } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'UPDATE testimonials SET student_name = $1, review = $2, rating = $3, role = $4 WHERE id = $5 RETURNING *',
      [student_name, review, rating, role || 'Tələbə', id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.queryWrapper('DELETE FROM testimonials WHERE id = $1', [id]);
    res.json({ message: 'Testimonial removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// FAQs
const createFaq = async (req, res) => {
  const { question, answer } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'INSERT INTO faqs (question, answer) VALUES ($1, $2) RETURNING *',
      [question, answer]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateFaq = async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'UPDATE faqs SET question = $1, answer = $2 WHERE id = $3 RETURNING *',
      [question, answer, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteFaq = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.queryWrapper('DELETE FROM faqs WHERE id = $1', [id]);
    res.json({ message: 'FAQ removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Social Media
const createSocialMedia = async (req, res) => {
  const { platform, icon, url } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'INSERT INTO social_media (platform, icon, url) VALUES ($1, $2, $3) RETURNING *',
      [platform, icon, url]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSocialMedia = async (req, res) => {
  const { id } = req.params;
  const { platform, icon, url } = req.body;
  try {
    const { rows } = await pool.queryWrapper(
      'UPDATE social_media SET platform = $1, icon = $2, url = $3 WHERE id = $4 RETURNING *',
      [platform, icon, url, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSocialMedia = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.queryWrapper('DELETE FROM social_media WHERE id = $1', [id]);
    res.json({ message: 'Social media removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Şəkil seçilməyib' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Server xətası' });
  }
};

module.exports = {
  updateSetting,
  createService, updateService, deleteService,
  createPrice, updatePrice, deletePrice,
  createAdvantage, updateAdvantage, deleteAdvantage,
  createTestimonial, updateTestimonial, deleteTestimonial,
  createFaq, updateFaq, deleteFaq,
  createSocialMedia, updateSocialMedia, deleteSocialMedia,
  uploadImage
};
