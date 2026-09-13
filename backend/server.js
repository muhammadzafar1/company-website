import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import { seedAdmin } from './controllers/authController.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (_req, res) => {
  const readyState = mongoose.connection.readyState;
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  return res.status(200).json({
    success: true,
    message: 'Database health check',
    data: {
      status: readyState === 1 ? 'ok' : 'not-ready',
      mongo: stateMap[readyState] || 'unknown',
      readyState,
    },
  });
});

app.use('/api/admin', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/services', serviceRoutes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    data: {},
  });
});

app.use(errorMiddleware);

const startServer = async () => {
  const dbConnected = await connectDB();

  if (dbConnected) {
    await seedAdmin();
  } else {
    console.warn('Server started without MongoDB connection. Login will not work until database is reachable.');
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
