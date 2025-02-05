import express from 'express';
import {
  getAllPets,
  getPetById,
  updatePet,
  deletePet,
  createPet,
  donate,
  donationStatusCheck,
} from '../../controllers/pet-controller.js';

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

// POST /pets/donate - Donate to the company
router.post('/donate', donate);

// GET /pets/donate/status-check/session_id - Check the status of the donation using stripe session id
router.get('/donate/status-check/:session_id', donationStatusCheck);

export { router as petRouter };
