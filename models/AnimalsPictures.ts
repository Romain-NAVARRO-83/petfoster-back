import { sequelize } from './dbClientSequelize';
import { Model, Optional, DataTypes } from 'sequelize';
import Animal from './Animal';

// Définition des attributs pour les images des animaux
type AnimalsPicturesAttributes = {
  id: number;
  URL_picture: string;
  animals_id: number;
  created_at: Date;
  updated_at?: Date; // optionnel
};

// Définition des attributs pour la création, avec 'id' optionnel
type AnimalsPicturesCreationAttributes = Optional<
  AnimalsPicturesAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class AnimalsPictures extends Model<
  AnimalsPicturesAttributes,
  AnimalsPicturesCreationAttributes
> {
  declare id: number;
  declare URL_picture: string;
  declare animals_id: number;
  declare created_at: Date;
  declare updated_at?: Date;
}

AnimalsPictures.init(
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
    animals_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Animal,
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
    tableName: 'animals_pictures',
    timestamps: false,
  }
);
export default AnimalsPictures;
