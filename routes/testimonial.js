import express from 'express';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonialReactions, 
  getAndrew, 
  createAndrew, 
  updateAndrewReactions
} from '../controllers/testimonialController.js';

const router = express.Router();

// Testimonial routes
router.get('/', getTestimonials);
router.post('/', createTestimonial);
router.patch('/:id/reaction', updateTestimonialReactions);

// Andrew (Facts) routes
router.get('/andrew', getAndrew);
router.post('/andrew', createAndrew);
router.patch('/andrew/:id/reaction', updateAndrewReactions);

export default router;
