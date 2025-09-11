// src/routes/userRouter.js (or .ts)
import { Router } from 'express';
import { isLoggedin } from '../middlewares/authMiddleware';


const userRouter = Express.Router();

userRouter.get("/profile/me",isLoggedin,getUserProfile)



export default userRouter;