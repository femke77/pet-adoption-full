import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

interface PetAttributes {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
  gender: string;
  location: string;
  size: string;
  image?: string | null;
  num_users?: number;
}

interface PetCreationAttributes extends Optional<PetAttributes, 'id'> {}

export class Pet
  extends Model<PetAttributes, PetCreationAttributes>
  implements PetAttributes
{
  public id!: number;
  public name!: string;
  public type!: string;
  public breed!: string;
  public age!: number;
  public gender!: string;
  public location!: string;
  public image?: string | null;
  public size!: string;
  public num_users?: number;
  public readonly favoritedBy?: User[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public countFavoritedBy!: () => Promise<number>;

  // public static override associations: {
  //   favoritedBy: Association<Pet, User>;
  // };
}

export function PetFactory(sequelize: Sequelize): typeof Pet {
  Pet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('dog', 'cat'),
        allowNull: false,
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.ENUM('S', 'M', 'L', 'XL'),
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
      sequelize,
    },
  );

  return Pet;
}
