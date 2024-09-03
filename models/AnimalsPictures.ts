import { DataTypes, Model } from 'sequelize';
import { sequelize } from './dbClientSequelize';
import Animal from './Animal';
class AnimalsPictures extends Model {}
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
