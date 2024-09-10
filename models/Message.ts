import { sequelize } from './dbClientSequelize';
import { Model, Optional, DataTypes, BOOLEAN } from 'sequelize';
import { User } from './User';

// Définition des attributs pour un message
type MessageAttributes = {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  is_read: Boolean;
  created_at: Date;
  updated_at?: Date; // optionnel
};

// Définition des attributs pour la création, avec 'id' optionnel
type MessageCreationAttributes = Optional<
  MessageAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class Message extends Model<MessageAttributes, MessageCreationAttributes> {
  declare id: number;
  declare sender_id: number;
  declare receiver_id: number;
  declare content: string;
  declare is_read: Boolean;
  declare created_at: Date;
  declare updated_at?: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: 'messages',
    timestamps: false,
  }
);
export default Message;
