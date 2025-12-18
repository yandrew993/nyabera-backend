import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { date: 'desc' },
      select: {
        id: true,
        name: true,
        relationship: true,
        testimonial: true,
        image: true,
        rating: true,
        date: true,
        approved: true,
        likes: true,
        hearts: true,
      },
    });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, relationship, testimonial, image, rating } = req.body;
    if (!name || !relationship || !testimonial || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newTestimonial = await prisma.testimonial.create({
      data: { name, relationship, testimonial, image, rating, likes: 0, hearts: 0 },
    });
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

export const updateTestimonialReactions = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, action } = req.body; // type: 'like' or 'heart', action: 'increment' or 'decrement'
    if (!id || !['like', 'heart'].includes(type) || !['increment', 'decrement'].includes(action)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const field = type === 'like' ? 'likes' : 'hearts';
    const updateOp = action === 'increment' ? { increment: 1 } : { decrement: 1 };
    const updated = await prisma.testimonial.update({
      where: { id },
      data: { [field]: updateOp },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update reactions' });
  }
};

export const getAndrew = async (req, res) => {
  try {
    const andrew = await prisma.andrew.findMany({
      orderBy: { date: 'desc' },
      select: {
        id: true,
        factId: true,
        name: true,
        comment: true,
        date: true,
        approved: true,
        likes: true,
        hearts: true,
      },
    });
    res.json(andrew);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Andrew records' });
  }
};

export const createAndrew = async (req, res) => {
  try {
    const { factId, name, comment } = req.body;
    if (!factId || !comment) {
      return res.status(400).json({ error: 'Missing required fields: factId, comment' });
    }
    const newAndrew = await prisma.andrew.create({
      data: { factId, name, comment, likes: 0, hearts: 0 },
    });
    res.status(201).json(newAndrew);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create Andrew record' });
  }
};

export const updateAndrewReactions = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, action } = req.body; // type: 'like' or 'heart', action: 'increment' or 'decrement'
    if (!id || !['like', 'heart'].includes(type) || !['increment', 'decrement'].includes(action)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const field = type === 'like' ? 'likes' : 'hearts';
    const updateOp = action === 'increment' ? { increment: 1 } : { decrement: 1 };
    const updated = await prisma.andrew.update({
      where: { id },
      data: { [field]: updateOp },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update Andrew reactions' });
  }
};
