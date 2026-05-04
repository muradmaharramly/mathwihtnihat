const express = require('express');
const router = express.Router();
const {
  getSettings,
  getServices,
  getPrices,
  getAdvantages,
  getTestimonials,
  getFaqs,
  getSocialMedia
} = require('../controllers/publicController');

const { submitRegistration } = require('../controllers/registrationController');

router.get('/settings', getSettings);
router.get('/services', getServices);
router.get('/prices', getPrices);
router.get('/advantages', getAdvantages);
router.get('/testimonials', getTestimonials);
router.get('/faqs', getFaqs);
router.get('/social_media', getSocialMedia);
router.post('/register', submitRegistration);

module.exports = router;
