import express from 'express';
import {
  signupUser,
  loginUser,
  logoutUser,
  showUser,
  updateUser,
  deleteUser,
  getUsers
} from '../Controller/userController.js';
import { protect, admin } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', signupUser);                       // register user
router.post('/login', loginUser);                           // login user
router.post('/logout', protect, logoutUser);                // logout user
router.get('/showMe', protect, showUser);                   // show userProfile
router.put('/update', protect, updateUser);                 // update user
router.delete('/delete', protect, deleteUser);              // delete user
router.get('/allUsers',protect,admin,getUsers)              // getAll users
export default router;
