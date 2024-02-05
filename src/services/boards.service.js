import { ApiError } from '../exeptions/api.error.js';
import { Boards } from '../models/boards.js';

export const getById = async(id) => {
  try {
    const board = await Boards.findByPk(id);

    return board.id;
  } catch (error) {
    throw ApiError.notFound('Cannot find', {
      board: 'Board not found',
    });
  }
};

export const create = async() => {
  try {
    const board = await Boards.create();

    return board;
  } catch (error) {
    throw ApiError.cannotCreate('Cannot create new board');
  }
};

export const remove = async(id) => {
  await Boards.destroy({
    where: {
      id,
    },
  });
};
