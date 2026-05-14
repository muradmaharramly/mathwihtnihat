const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  updateSetting,
  createService, updateService, deleteService,
  createPrice, updatePrice, deletePrice,
  createAdvantage, updateAdvantage, deleteAdvantage,
  createTestimonial, updateTestimonial, deleteTestimonial,
  createFaq, updateFaq, deleteFaq,
  createSocialMedia, updateSocialMedia, deleteSocialMedia,
  uploadImage
} = require('../controllers/adminController');
const upload = require('../middlewares/uploadMiddleware');

router.use(protect); // All routes below are protected

router.put('/settings/:key', updateSetting);

router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

router.post('/prices', createPrice);
router.put('/prices/:id', updatePrice);
router.delete('/prices/:id', deletePrice);

router.post('/advantages', createAdvantage);
router.put('/advantages/:id', updateAdvantage);
router.delete('/advantages/:id', deleteAdvantage);

router.post('/testimonials', createTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

router.post('/faqs', createFaq);
router.put('/faqs/:id', updateFaq);
router.delete('/faqs/:id', deleteFaq);

router.post('/social_media', createSocialMedia);
router.put('/social_media/:id', updateSocialMedia);
router.delete('/social_media/:id', deleteSocialMedia);

router.post('/upload', upload.single('image'), uploadImage);

const { getRegistrations, updateRegistrationStatus, deleteRegistration } = require('../controllers/registrationController');
router.get('/registrations', getRegistrations);
router.put('/registrations/:id', updateRegistrationStatus);
router.delete('/registrations/:id', deleteRegistration);

module.exports = router;
