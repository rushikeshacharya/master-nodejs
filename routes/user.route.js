import express from 'express';
import { handleUserSignup, handleUserLogin } from '../controller/user.controller.js';
export const userRoute = express.Router();

userRoute.post('/', handleUserSignup)
userRoute.post('/login', handleUserLogin)