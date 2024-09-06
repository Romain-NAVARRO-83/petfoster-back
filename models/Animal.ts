import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from './dbClientSequelize';
import Species from './Species';
import { User } from './User';

// Définition des attributs pour l'Animal
type AnimalAttributes = {
  id: number;
  name: string;
  date_of_birth?: Date;
  sexe: string;
  race?: string;
  short_story?: string;
  long_story?: string;
  health?: string;
  species_id: number;
  creator_id: number;
  created_at: Date;
  updated_at?: Date;
};

// Définition des attributs pour la création (id, created_at, updated_at optionnels)
type AnimalCreationAttributes = Optional<
  AnimalAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class Animal extends Model<AnimalAttributes, AnimalCreationAttributes> {
  declare id: number;
  declare name: string;
  declare date_of_birth?: Date;
  declare sexe: string;
  declare race?: string;
  declare short_story?: string;
  declare long_story?: string;
  declare health?: string;
  declare species_id: number;
  declare creator_id: number;
  declare created_at: Date;
  declare updated_at?: Date;
}

Animal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    sexe: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING(255),
    },
    short_story: {
      type: DataTypes.STRING(255),
    },
    long_story: {
      type: DataTypes.TEXT,
    },
    health: {
      type: DataTypes.STRING(255),
    },
    species_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Species,
        key: 'id',
      },
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'animals',
    timestamps: false,
  }
);
export default Animal;
