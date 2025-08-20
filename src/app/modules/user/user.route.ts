import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

//seller as user route
router.post('/create-seller', UserController.createSeller);

export const UserRoutes = router;
