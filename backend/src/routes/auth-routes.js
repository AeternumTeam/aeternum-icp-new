import express from "express";
import { getToken, getLoginGoogleUrl, isLoggedIn, login, logout, register } from "../controllers/authController.js";
import verifyJWT from "../middlewares/jwt-middleware.js";

const router = express.Router();

router.get('/url', getLoginGoogleUrl);
router.get('/token', getToken);
router.get('/logged_in', isLoggedIn);

router.post('/login', login);
router.post('/register', register);
router.post('/logout', verifyJWT, logout);

export default router;