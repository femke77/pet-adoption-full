import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { PetFactory } from './pet.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        dialect: 'postgres',
        dialectOptions: {
          ssl: {     
            require: true,
            rejectUnauthorized: false 
          }
        }
      },
    );

const User = UserFactory(sequelize);
const Pet = PetFactory(sequelize);

User.belongsToMany(Pet, { through: 'UserPets', as: 'favoritePets' });
Pet.belongsToMany(User, { through: 'UserPets', as: 'favoritedBy' });

export { sequelize, User, Pet };
