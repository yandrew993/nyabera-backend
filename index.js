import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import testimonialAndAndrewRoutes from './routes/testimonial.js';

dotenv.config();

const app = express();

// Debug middleware
app.use((req, res, next) => {
  const body = req.method === 'GET' ? '' : JSON.stringify(req.body);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${body}`);
  next();
});

app.use(cors({
  origin: [
    'https://jane-nyabera.vercel.app',
    'http://localhost:3000',
    'https://nyabera-backend.onrender.com',
    "https://andrewyoung.vercel.app"
  ],
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));

app.use('/api/testimonials', testimonialAndAndrewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'NOT SET');
});
