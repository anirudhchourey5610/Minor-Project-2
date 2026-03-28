import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import opportunityRoutes from './routes/opportunities.js';
import resourceRoutes from './routes/resources.js';
import communityTipRoutes from './routes/communityTips.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let connectionPromise;

const ensureDatabaseConnection = async () => {
  if (!connectionPromise) {
    connectionPromise = connectDB();
  }

  await connectionPromise;
};

app.use(async (req, res, next) => {
  try {
    await ensureDatabaseConnection();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/community-tips', communityTipRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Help Hub API is running' });
});

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;

  ensureDatabaseConnection()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Failed to start server:', error);
      process.exit(1);
    });
}

export default app;
