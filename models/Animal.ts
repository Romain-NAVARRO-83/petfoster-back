import { DataTypes, Model } from 'sequelize';
import { sequelize } from './dbClientSequelize';
import Species from './Species';
import User from './User';

class Animal extends Model {}
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
