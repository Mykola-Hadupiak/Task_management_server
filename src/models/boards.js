import { DataTypes } from 'sequelize';
import { client } from '../utils/db.js';

export const Boards = client.define('Boards', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.NOW,
  },
}, {
  tableName: 'boards',
  updatedAt: false,
});
