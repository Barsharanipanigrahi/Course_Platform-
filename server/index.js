const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const orderRoutes = require('./route/orderRoutes');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS setup — explicit allowed origins
const allowedOrigins = [
  'http://localhost:5173',              // local dev frontend
  'https://your-deployed-frontend.com'  // replace with your real deployed frontend URL, if any
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, curl, or mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
const authRoutes       = require('./route/authRoutes');
const ContactRoutes    = require('./route/contactRoute');
const CoursesRoutes    = require('./route/courseRoutes');
const enrollmentRoutes = require('./route/enrollmentRoutes');
const userRoutes       = require('./route/userRoutes');
const catagoryRoutes   = require('./route/categoryRoutes');

// Mount Routes
app.use('/api/order',      orderRoutes);
app.use('/api/auth',       authRoutes);
app.use('/api/contact',    ContactRoutes);
app.use('/api/course',     CoursesRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/user',       userRoutes);
app.use('/api/category',   catagoryRoutes);

app.get('/', (req, res) => res.send('API is running...'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));