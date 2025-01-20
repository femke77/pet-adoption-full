import express from 'express';
import {
  getAllPets,
  getPetById,
  updatePet,
  deletePet,
  createPet,
} from '../../controllers/pet-controller.js';
// import { apiGuard } from '../../middleware/authGuard.js';
const router = express.Router();

// GET /pets - Get all pets
router.get('/multi/:type?/:breed?', getAllPets);

// GET /pets/:id - Get a pet by id
router.get('/:id', getPetById);

// PUT /pets/:id - Update a pet by id
router.put('/:id', updatePet);

// POST /pets/ - Create Pet
router.post('/', createPet);

// DELETE /pets/:id - Delete a pet by id
router.delete('/:id', deletePet);

export { router as petRouter };
