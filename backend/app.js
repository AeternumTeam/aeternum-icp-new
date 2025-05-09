import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from 'express-rate-limit';

import configs from "./src/config/config.js";
import authRoute from './src/routes/auth-routes.js';
import userRoute from './src/routes/auth-routes.js';
import issuerRoute from './src/routes/issuer-routes.js';
import verifierRoute from './src/routes/verifier-routes.js';
import imgRoute from './src/routes/file-routes.js';

const app = express();

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/issuer', issuerRoute);
app.use('/api/v1/verifier', verifierRoute);
app.use('/api/img', imgRoute);

// Start the server
app.listen(configs.port, '0.0.0.0', () => {
    console.log(`Server running on port ${configs.port}`);
});