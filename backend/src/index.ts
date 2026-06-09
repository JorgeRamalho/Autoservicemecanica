import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { authRouter, usersRouter } from './routes/auth.js';
import { seedDemoUser } from './seed.js';

const app = express();

app.use(
  cors({
    origin: [config.corsOrigin, 'http://localhost:5174', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Auto Service Mecânica API' });
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

seedDemoUser();

app.listen(config.port, () => {
  console.log(`API rodando em http://localhost:${config.port}`);
  console.log(`Health check: http://localhost:${config.port}/api/health`);
});
