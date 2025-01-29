import express from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  favoritePet,
  removeFavoritePet,
  getLoggedInUser,
} from '../../controllers/user-controller.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - get logged in user
router.get('/me', getLoggedInUser);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

// POST /users/favorite - Favorite a pet
router.post('/favorite/:petId', favoritePet);

// DELETE /users/favorite - Remove a favorite pet
router.delete('/favorite/:petId', removeFavoritePet);



export { router as userRouter };
