import { Request, Response } from 'express';
import { Pet, User } from '../models/index.js';
import Stripe from 'stripe';

const key = process.env.STRIPE_API_KEY;
if (!key) {
  throw new Error('Missing Stripe API key');
}
const stripeInstance = new Stripe(key);

// POST /donate - Create a donation session
export const donate = async (req: Request, res: Response) => {
  const { amount } = req.body;
  const referer = req.headers.referer || '';
  const url = new URL(referer).origin;
  console.log(amount);
  
  try {
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to PawSome Pets Adoption',
            },
            unit_amount: Math.round(amount *100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${url}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/donate`,
    });
    if (session) {
      res.json(session.id);
    } else {
      res.status(500).json({ message: 'Failed to create session' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

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

// GET /Pets/:id returns Pet with number of users who are interested in the pet
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

// POST /Pets  Create pet
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

// PUT /Pets/:id  Update Pet
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

// DELETE /Pets/:id  Delete a pet
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
