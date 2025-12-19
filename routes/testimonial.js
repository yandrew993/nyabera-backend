import express from 'express';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonialReactions, 
  getAndrew, 
  createAndrew, 
  updateAndrewReactions,
  getFacts,
  createFact,
  updateFactReactions
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

// Fact routes (for tracking reactions per fact)
router.get('/facts', getFacts);
router.post('/facts', createFact);
router.patch('/facts/:factId/reaction', updateFactReactions);

export default router;
