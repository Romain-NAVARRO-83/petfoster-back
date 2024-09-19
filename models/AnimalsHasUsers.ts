import { sequelize } from './dbClientSequelize';
import { Model, Optional, DataTypes } from 'sequelize';
import Animal from './Animal';
import { User } from './User';

// Définition des attributs pour la relation Animal-User
type AnimalsHasUsersAttributes = {
  id: number;
  animals_id: number;
  users_id: number;
  date_start?: Date; // optionnel
  date_end?: Date | null; // optionnel
  created_at: Date;
  updated_at?: Date; // optionnel
};

// Définition des attributs pour la création, avec 'id' optionnel
type AnimalsHasUsersCreationAttributes = Optional<
  AnimalsHasUsersAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class AnimalsHasUsers extends Model<
  AnimalsHasUsersAttributes,
  AnimalsHasUsersCreationAttributes
> {
  declare id: number;
  declare animals_id: number;
  declare users_id: number;
  declare date_start?: Date;
  declare date_end?: Date | null;
  declare created_at: Date;
  declare updated_at?: Date;
}

AnimalsHasUsers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    animals_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Animal,
        key: 'id',
      },
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    date_start: {
      type: DataTypes.DATE,
    },
    date_end: {
      type: DataTypes.DATE,
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
    tableName: 'animals_has_users',
    timestamps: false,
  }
);
export default AnimalsHasUsers;
