require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const flightRoutes = require('./routes/flights');
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://frontend-flight.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://reksitrajan01:8n4SHiaJfCZRrimg@cluster0.mperr.mongodb.net/flightbooking?retryWrites=true&w=majority';
    
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', mongoURI ? 'URI provided' : 'No URI found');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout for slow connections
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Full error:', error);
    // Don't exit process in production, let Render restart
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// Initialize database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Flight Booking API is running' });
});

// Basic root route for API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Flight Booking API is running successfully!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server is running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  console.log(`🗄️ MongoDB URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set'}`);
  console.log('🎯 Server ready to accept connections');
});
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Promise Rejection:', err.message);
  server.close(() => {
    process.exit(1);
  });
});
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💥 Process terminated');
  });
});
