import { PrismaClient } from '@prisma/client';

let prisma;
try {
  prisma = new PrismaClient();
  console.log('✓ Prisma Client initialized successfully');
  console.log('Available models:', Object.keys(prisma).filter(key => !key.startsWith('_')).join(', '));
} catch (err) {
  console.error('✗ Failed to initialize Prisma Client:', err.message);
  process.exit(1);
}

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
    console.log('Fetching Andrew records...');
    console.log('Prisma andrew model available:', !!prisma.andrew);
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
    console.log('Andrew records fetched:', andrew);
    res.json(andrew);
  } catch (err) {
    console.error('Error fetching Andrew records:', err.message);
    console.error('Error stack:', err.stack);
    console.error('Prisma object keys:', Object.keys(prisma).filter(key => !key.startsWith('_')));
    res.status(500).json({ error: 'Failed to fetch Andrew records', details: err.message });
  }
};

export const createAndrew = async (req, res) => {
  try {
    const { factId, name, comment } = req.body;
    console.log('Creating Andrew record with:', { factId, name, comment });
    
    if (!factId || !comment) {
      return res.status(400).json({ error: 'Missing required fields: factId, comment' });
    }
    
    const newAndrew = await prisma.andrew.create({
      data: { factId, name, comment, likes: 0, hearts: 0 },
    });
    console.log('Andrew record created:', newAndrew);
    res.status(201).json(newAndrew);
  } catch (err) {
    console.error('Error creating Andrew record:', err.message);
    res.status(500).json({ error: 'Failed to create Andrew record', details: err.message });
  }
};

export const updateAndrewReactions = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, action } = req.body;
    console.log('Updating Andrew reactions:', { id, type, action });
    
    if (!id || !['like', 'heart'].includes(type) || !['increment', 'decrement'].includes(action)) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    
    const field = type === 'like' ? 'likes' : 'hearts';
    const updateOp = action === 'increment' ? { increment: 1 } : { decrement: 1 };
    // Use the MongoDB ObjectId (id field) for updates
    const updated = await prisma.andrew.update({
      where: { id },
      data: { [field]: updateOp },
    });
    console.log('Andrew reactions updated:', updated);
    res.json(updated);
  } catch (err) {
    console.error('Error updating Andrew reactions:', err.message);
    res.status(500).json({ error: 'Failed to update Andrew reactions', details: err.message });
  }
};
