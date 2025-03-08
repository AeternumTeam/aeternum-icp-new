import express from "express";
import path from 'path';
import fs from 'fs';
import { StatusCodes } from "http-status-codes";
import { fileURLToPath } from 'url';

const router = express.Router();

router.get('/:file', (req, res) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(__dirname, '..', 'storage', 'uploads', req.params.file);
    fs.access(filePath, fs.constants.F_OK, (err) => { 
        if (err) { 
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: StatusCodes.BAD_REQUEST,
                message: 'Bad Request',
                error : 'File not found.'
            }); 
        }
    });

    res.sendFile(filePath);
})

export default router;