import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import { Pet } from './pet';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  favoritePets?: Pet[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public first_name!: string;
  public last_name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public getFavortiePets!: () => Promise<Pet[]>;
  public addFavoritePet!: (pet: Pet) => Promise<void>;
  public removeFavoritePet!: (pet: Pet) => Promise<void>;
  public countFavoritePets!: () => Promise<number>;

  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 30],
        },
      },
    },
    {
      freezeTableName: true,
      sequelize,
      hooks: {
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          await user.setPassword(user.password);
        },
      },
    },
  );

  return User;
}
