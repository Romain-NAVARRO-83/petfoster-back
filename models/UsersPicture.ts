import { DataTypes, Model } from 'sequelize';
import { sequelize } from './dbClientSequelize';
import User from './User';
class UsersPicture extends Model {}
UsersPicture.init(
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
export default UsersPicture;
