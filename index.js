import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import testimonialRoutes from './routes/testimonial.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use('/api/testimonials', testimonialRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
