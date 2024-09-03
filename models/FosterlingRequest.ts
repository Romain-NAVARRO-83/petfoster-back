import { DataTypes, Model } from 'sequelize';
import { sequelize } from './dbClientSequelize';
import Animal from './Animal';
import User from './User';
class FosterlingRequest extends Model {}
FosterlingRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    request_status: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content_request: {
      type: DataTypes.TEXT,
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
    tableName: 'fosterling_requests',
    timestamps: false,
  }
);
export default FosterlingRequest;
