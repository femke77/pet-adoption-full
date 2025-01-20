import { User, Pet, sequelize } from '../src/models/index.ts';

import userData from './user_data.json';
import petData from './pet_data.json';

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Pet.bulkCreate(petData);

  console.log(' 🌱🌱🌱🌱🌱🌱🌱🌱 SEEDING DONE! 🌱🌱🌱🌱🌱🌱🌱🌱🌱');

  process.exit(0);
};

seedDatabase();
