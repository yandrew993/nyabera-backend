# Teacher Portfolio Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up MongoDB and ensure it is running (default: mongodb://localhost:27017/teacher_portfolio).
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/testimonials` — Get all testimonials
- `POST /api/testimonials` — Create a new testimonial

### POST Body Example
```json
{
  "name": "John Doe",
  "relationship": "Colleague",
  "testimonial": "Great teacher!",
  "image": "https://example.com/image.jpg",
  "rating": 5,
  "date": "2025-07-06"
}
```
