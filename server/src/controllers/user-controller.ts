import { Request, Response } from 'express';
import { User } from '../models/user.js';
import { Pet } from '../models/pet.js';
// import { sequelize } from '../models/index.js';
// GET /Users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id ? req.params.id : req.session.user_id;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{ 
        model: Pet, 
        as: 'favoritePets',
        include: [{
          model: User,
          as: 'favoritedBy', // Assuming this is the correct association name
          attributes: ['id'] // Select specific user fields
        }]
      }],
    });

    if (user) {
      const updatedUser = user.get({ plain: true });
      updatedUser.favoritePets = updatedUser.favoritePets
        ? updatedUser.favoritePets.map((pet: any) => ({
            ...pet, 
            isFavorited: pet.favoritedBy?.some(
              (user: { id: number }) => user.id === id,
            ) ?? false,
            num_users: pet.favoritedBy?.length || 0,
  
          }))
        : [];

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.update(req.body, {
      where: { id: id },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Users/favorite/:petId - Favorite a pet
export const favoritePet = async (req: Request, res: Response) => {
  const { petId } = req.params;
  try {
    const user = await User.findByPk(req.session.user_id);
    const pet = await Pet.findByPk(petId);
    if (user && pet) {
      await user.addFavoritePet(pet);
      res.json([{ message: 'Pet added to favorites' }]);
    } else {
      res.status(404).json({ message: 'User or pet not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /Users/favorite/:petId - Unfavorite a pet
export const removeFavoritePet = async (req: Request, res: Response) => {
  const { petId } = req.params;
  try {
    const user = await User.findByPk(req.session.user_id);
    const pet = await Pet.findByPk(petId);
    if (user && pet) {
      await user.removeFavoritePet(pet);
      res.json([{ message: 'Pet removed from favorites' }]);
    } else {
      res.status(404).json({ message: 'User or pet not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
