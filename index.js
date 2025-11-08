const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log('📦 Loading routers...');

try {
  const authRouter = require('./src/routers/authRouter');
  console.log('✅ authRouter loaded:', typeof authRouter);
} catch (err) {
  console.error('❌ authRouter error:', err.message);
}

try {
  const postsRouter = require('./src/routers/postsRouter');
  console.log('✅ postsRouter loaded:', typeof postsRouter);
} catch (err) {
  console.error('❌ postsRouter error:', err.message);
}

try {
  const reminderRouter = require('./src/routers/reminderRouter');
  console.log('✅ reminderRouter loaded:', typeof reminderRouter);
} catch (err) {
  console.error('❌ reminderRouter error:', err.message);
}

const authRouter = require('./src/routers/authRouter');
const postsRouter = require('./src/routers/postsRouter');
const reminderRouter = require('./src/routers/reminderRouter');

console.log('🔍 Final check:');
console.log('authRouter:', typeof authRouter === 'function' ? '✅ function' : '❌ ' + typeof authRouter);
console.log('postsRouter:', typeof postsRouter === 'function' ? '✅ function' : '❌ ' + typeof postsRouter);
console.log('reminderRouter:', typeof reminderRouter === 'function' ? '✅ function' : '❌ ' + typeof reminderRouter);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Database connected'))
    .catch(err => console.error('❌ Database connection error:', err.message));

const app = express();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

console.log('🚀 Registering routes...');
app.use('/api/auth', authRouter);
console.log('✅ Auth routes registered');

app.use('/api/posts', postsRouter);
console.log('✅ Posts routes registered');

app.use('/api/reminder', reminderRouter);
console.log('✅ Reminder routes registered');

app.get('/', (req, res) => res.json({ message: 'Hello from the server' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));