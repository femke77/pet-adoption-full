import { User, Pet, sequelize } from '../src/models/index.ts';

import userData from './user_data.json';
import petData from './pet_data.json';

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const pets = await Pet.bulkCreate(petData);

  users.forEach((user) => {
    const randomPets = pets.sort(() => Math.random() - 0.5).slice(0, 8);
    randomPets.forEach(async (pet) => {
      await user.addFavoritePet(pet);
    });
  })


  console.log(' 🌱🌱🌱🌱🌱🌱🌱🌱 SEEDING DONE! 🌱🌱🌱🌱🌱🌱🌱🌱🌱');

  process.exit(0);
};

seedDatabase();
