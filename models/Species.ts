import { sequelize } from './dbClientSequelize';
import { Model, Optional, DataTypes } from 'sequelize';

// Définition des attributs de l'espèce
type SpeciesAttributes = {
  id: number;
  name: string;
  created_at: Date;
  updated_at?: Date; // optionnel
};

// Définition des attributs pour la création, avec 'id' optionnel
type SpeciesCreationAttributes = Optional<
  SpeciesAttributes,
  'id' | 'created_at' | 'updated_at'
>;

class Species extends Model<SpeciesAttributes, SpeciesCreationAttributes> {
  declare id: number;
  declare name: string;
  declare created_at: Date;
  declare updated_at?: Date;
}

Species.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: 'species',
    timestamps: false,
  }
);
export default Species;
