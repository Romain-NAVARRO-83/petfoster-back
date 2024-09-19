import { sequelize } from './dbClientSequelize';
import { Model, Optional, DataTypes } from 'sequelize';
import { User } from './User';

// Définition des attributs pour les images des animaux
type UsersPicturesAttributes = {
  id: number;
  URL_picture: string;
  users_id: number;
  created_at: Date;
  updated_at?: Date; // optionnel
};

// Définition des attributs pour la création, avec 'id' optionnel
type UsersPicturesCreationAttributes = Optional<
  UsersPicturesAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class UsersPictures extends Model<
  UsersPicturesAttributes,
  UsersPicturesCreationAttributes
> {
  declare id: number;
  declare URL_picture: string;
  declare animals_id: number;
  declare created_at: Date;
  declare updated_at?: Date;
}

UsersPictures.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    URL_picture: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    users_id: {
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
    tableName: 'users_pictures',
    timestamps: false,
  }
);
export default UsersPictures;
