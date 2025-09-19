import { Router } from 'express';
import {getUserDetails} from '../controllers/userController.js';
import { isLoggedIn } from '../middlewares/authMiddleware.js'; 

const userRouter = Router();
userRouter.get('/me', isLoggedIn, getUserDetails);

export default userRouter;

