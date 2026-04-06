const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


// Routes
const authRoutes = require('./route/authRoutes');
const ContactRoutes = require('./route/contactRoute');
const CoursesRoutes = require('./route/courseRoutes');
const enrollmentRoutes = require('./route/enrollmentRoutes');
const userRoutes = require('./route/userRoutes');
const catagoryRoutes = require('./route/categoryRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/Contact', ContactRoutes);
app.use('/api/course', CoursesRoutes);
app.use("/api/enrollment", enrollmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", catagoryRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(8000, () => {
  console.log(`Server running on port ${PORT}`);
});