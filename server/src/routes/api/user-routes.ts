import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  favoritePet,
  removeFavoritePet,
} from '../../controllers/user-controller.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/user/:id?', getUserById);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

// POST /users/favorite - Favorite a pet
router.post('/favorite/:petId', favoritePet);

router.delete('/favorite/:petId', removeFavoritePet);

export { router as userRouter };
