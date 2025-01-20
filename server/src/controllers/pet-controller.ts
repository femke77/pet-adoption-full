import { Request, Response } from 'express';
import { Pet, User } from '../models/index.js';

// GET /Pets/:type?/:breed?
export const getAllPets = async (req: Request, res: Response) => {
  const userId = req.session?.user_id;
  const { type, breed } = req.params;
  const whereClause = type ? (breed ? { type, breed } : { type }) : {};
  try {
    const pets = await Pet.findAll({
      where: whereClause,
      include: {
        model: User,
        as: 'favoritedBy',
        attributes: ['id'],
        through: { attributes: [] },
      },
      order: [
        ['id', 'DESC'], // required for react query cache invalidate to not reorder on the DOM
    ],
    });
    const updatedPets = pets.map((pet) => {
      const petData = pet.get({ plain: true });

      const isFavorited = userId
        ? (pet.favoritedBy?.some(
            (user: { id: number }) => user.id === userId,
          ) ?? false)
        : false;

      return {
        ...petData,
        isFavorited,
        num_users: pet.favoritedBy?.length || 0,
      };
    });
    res.json(updatedPets);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// GET /Pets/:id with number of users who are interested in the pet
export const getPetById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findByPk(id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const numUsers = await pet.countFavoritedBy();
    return res.json({ ...pet.toJSON(), num_users: numUsers });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /Pets
export const createPet = async (req: Request, res: Response) => {
  try {
    const pet = new Pet({
      name: req.body.name,
      age: req.body.age,
      breed: req.body.breed,
      type: req.body.type,
      gender: req.body.gender,
      location: req.body.location,
      size: req.body.size,
      image: req.body.image,
    });
    await pet.save();
    res.status(201).json(pet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /Pets/:id
export const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.update(req.body, {
      where: { id: id },
      returning: true,
    });
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Pets/:id
export const deletePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByPk(id);
    if (pet) {
      await pet.destroy();
      res.json({ message: 'Pet deleted' });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
