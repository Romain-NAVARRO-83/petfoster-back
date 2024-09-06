import { sequelize } from './dbClientSequelize';
import { Model, Optional, DataTypes } from 'sequelize';
import { User } from './User';
import Species from './Species';

// Définition des attributs pour le profil d'accueil
type FosterlingProfileAttributes = {
  id: number;
  age: string;
  sexe: string;
  search_area: number;
  users_id: number;
  species_id: number;
  created_at: Date;
  updated_at?: Date; // optionnel
};

// Définition des attributs pour la création, avec 'id' optionnel
type FosterlingProfileCreationAttributes = Optional<
  FosterlingProfileAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class FosterlingProfile extends Model<
  FosterlingProfileAttributes,
  FosterlingProfileCreationAttributes
> {
  declare id: number;
  declare age: string;
  declare sexe: string;
  declare search_area: number;
  declare users_id: number;
  declare species_id: number;
  declare created_at: Date;
  declare updated_at?: Date;
}

FosterlingProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    age: {
      type: DataTypes.STRING, // You might want to change this based on the exact type you need
    },
    sexe: {
      type: DataTypes.CHAR(1),
    },
    search_area: {
      type: DataTypes.INTEGER,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    species_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Species,
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
    tableName: 'fosterling_profiles',
    timestamps: false,
  }
);
export default FosterlingProfile;
