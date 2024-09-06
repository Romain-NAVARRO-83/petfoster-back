import { sequelize } from './dbClientSequelize';
import { Model, Optional, DataTypes } from 'sequelize';

// Définition des attributs de l'utilisateur
type UserAttributes = {
  id: number;
  type_user: string;
  name: string;
  email: string;
  password: string;
  country: string;
  zip: number;
  city: string;
  longitude: number;
  latitude: number;
  phone?: string; // optionnel
  address?: string; // optionnel
  website?: string; // optionnel
  description?: string; // optionnel, ajout de la description
  created_at: Date;
  updated_at?: Date; // optionnel
};

// Définition des attributs pour la création, avec 'id' optionnel
type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare type_user: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare country: string;
  declare zip: number;
  declare city: string;
  declare longitude: number;
  declare latitude: number;
  declare phone?: string;
  declare address?: string;
  declare website?: string;
  declare description?: string; // ajout de la description
  declare created_at: Date;
  declare updated_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type_user: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    website: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.STRING(1024), // ajout de la description avec une longueur maximale de 1024 caractères
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
    tableName: 'users',
    timestamps: false,
  }
);

export { UserAttributes, UserCreationAttributes, User };
