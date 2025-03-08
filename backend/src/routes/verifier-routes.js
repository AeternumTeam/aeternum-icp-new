import express from "express";
import { verifyCertificate } from "../controllers/verifierController.js";

const router = express.Router();

router.post("/verify-credential", verifyCertificate);

export default router;