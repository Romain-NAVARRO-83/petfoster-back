import { DataTypes, Model } from 'sequelize';
import { sequelize } from './dbClientSequelize';
import User from './User';
import Species from './Species';
class FosterlingProfile extends Model {}
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
