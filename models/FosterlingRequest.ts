import { sequelize } from './dbClientSequelize';
import { Model, Optional, DataTypes } from 'sequelize';
import Animal from './Animal';
import { User } from './User';

// Définition des attributs pour la demande d'accueil
type FosterlingRequestAttributes = {
  id: number;
  request_status: string;
  content_request?: string; // optionnel
  animals_id: number;
  users_id: number;
  created_at: Date;
  updated_at?: Date; // optionnel
};

// Définition des attributs pour la création, avec 'id' optionnel
type FosterlingRequestCreationAttributes = Optional<
  FosterlingRequestAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class FosterlingRequest extends Model<
  FosterlingRequestAttributes,
  FosterlingRequestCreationAttributes
> {
  declare id: number;
  declare request_status: string;
  declare content_request?: string;
  declare animals_id: number;
  declare users_id: number;
  declare created_at: Date;
  declare updated_at?: Date;
}

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
