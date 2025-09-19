import express from 'express';
import { getTestimonials, createTestimonial, updateTestimonialReactions } from '../controllers/testimonialController.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', createTestimonial);
router.patch('/:id/reaction', updateTestimonialReactions);

export default router;
