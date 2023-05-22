import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import httpProxy from 'http-proxy';
import cors from 'cors';
import Services from './constants/services';

const proxy = httpProxy.createProxyServer();
const app: Express = express();
const port = process.env.PORT || 5000;

const allowedOrigins = process.env.ALLOWED_ORIGINS || [
  'http://localhost:3000',
  'localhost',
  '127.0.0.1'
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log('Origin:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    allowedHeaders: [
      'authorization',
      'content-type',
      'iown-api-key',
      'pragma',
      'cache-control'
    ]
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.headers['iown-api-key'] = process.env.IOWN_API_KEY;
  req.headers['X-Forward-Host'] = process.env.X_FORWARD_HOST;
  next();
});

app.options('*', cors());

app.use(`/${Services.Payment.path}`, (req: Request, res: Response) => {
  const target = `${Services.Payment.host}:${Services.Payment.port}`;
  proxy.web(req, res, { target });
});

app.use(`/${Services.Authentication.path}`, (req: Request, res: Response) => {
  const target = `${Services.Authentication.host}:${Services.Authentication.port}`;
  proxy.web(req, res, { target });
});

app.use(`/${Services.Wallet.path}`, (req: Request, res: Response) => {
  const target = `${Services.Wallet.host}:${Services.Wallet.port}`;
  proxy.web(req, res, { target });
});

app.all('*', (req: Request, res: Response) => {
  res.sendStatus(404);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  // Generate random string for x-request-id header
  const randomString = Math.random().toString(36).substring(7);
  req.headers['x-request-id'] = randomString;
  res.setHeader('x-request-id', randomString);
  next();
});

app.use(`/${Services.Authentication.path}/*`, (req: Request, res: Response) => {
  const target = `${Services.Authentication.host}/validate`;
  proxy.web(req, res, { target });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port ${port}`);
});
