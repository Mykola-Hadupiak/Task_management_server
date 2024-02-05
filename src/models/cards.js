import { DataTypes } from 'sequelize';
import { client } from '../utils/db.js';

export const Cards = client.define('Cards', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('todo', 'in-progress', 'done'),
    allowNull: false,
    defaultValue: 'todo',
  },
  boardId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Date.NOW,
  },
}, {
  tableName: 'cards',
});
