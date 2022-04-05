import express, { Request, Response } from 'express';
import User from '../../entities/Category';
import bunyan from 'bunyan';
const log = bunyan.createLogger({name: __filename});

const router = express.Router();


export default router;