import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import testimonialAndAndrewRoutes from './routes/testimonial.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'https://jane-nyabera.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));

app.use('/api/testimonials', testimonialAndAndrewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
