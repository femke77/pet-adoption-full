import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { PetFactory } from './pet.js';

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialectOptions: isProduction
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
    })
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD || '',
      {
        dialect: 'postgres',
        dialectOptions: isProduction
          ? {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            }
          : {},
      }
    );

export default sequelize;


const User = UserFactory(sequelize);
const Pet = PetFactory(sequelize);

User.belongsToMany(Pet, { through: 'UserPets', as: 'favoritePets' });
Pet.belongsToMany(User, { through: 'UserPets', as: 'favoritedBy' });

export { sequelize, User, Pet };
