const express = require('express');
const router = express.Router();

const testimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', testimonialController.getAll);
router.get('/testimonials/random', testimonialController.getRandom);
router.get('/testimonials/:id', testimonialController.getById);
router.post('/testimonials', testimonialController.postAll);
router.put('/testimonials/:id', testimonialController.putById);
router.delete('/testimonials/:id', testimonialController.deleteById);

module.exports = router;