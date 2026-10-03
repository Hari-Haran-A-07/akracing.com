import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import carRoutes from './routes/carRoutes.js';
import championshipRoutes from './routes/championshipRoutes.js';
import raceRoutes from './routes/raceRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import storyRoutes from './routes/storyRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import telemetryRoutes from './routes/telemetryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Logging Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 500, // high limit for real-time telemetry polling
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api', limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    brand: 'AJITH KUMAR RACING (AKR)',
    positioning: 'RACING. PERFORMANCE. PRECISION.',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/championships', championshipRoutes);
app.use('/api/races', raceRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling
app.use(errorHandler);

// Connect DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🏎️  AJITH KUMAR RACING (AKR) SERVER ONLINE`);
    console.log(`📍 Port: http://localhost:${PORT}`);
    console.log(`🏁 Positioning: RACING. PERFORMANCE. PRECISION.`);
    console.log(`======================================================\n`);
  });
});
