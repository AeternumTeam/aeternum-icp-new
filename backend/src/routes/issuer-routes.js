import express from "express";
import { getCredentials, issuerCredential } from "../controllers/issuerController.js";
import verifyJWT from "../middlewares/jwt-middleware.js";
import upload from "../config/upload-file.js";

const router = express.Router();

router.get('/issuer-credential/:id', verifyJWT, getCredentials);
router.post('/issuer-credential', verifyJWT, upload.single('certificateFile'), issuerCredential);

export default router;