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

  await Promise.all(users.map(async (user) => {
    const randomPets = pets.sort(() => Math.random() - 0.5).slice(0, 15);
    await Promise.all(randomPets.map(async (pet) => {
      console.log(`Adding pet ${pet.id} to user ${user.id} favorites`);
      return user.addFavoritePet(pet);
    }));
  }));


  console.log(' 🌱🌱🌱🌱🌱🌱🌱🌱 SEEDING DONE! 🌱🌱🌱🌱🌱🌱🌱🌱🌱');

  process.exit(0);
};

seedDatabase();
