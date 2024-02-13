import { ApiError } from '../exeptions/api.error.js';
import { Boards } from '../models/boards.js';
import * as cardsService from './cards.service.js';

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

export const getOne = async(id) => {
  try {
    const board = await Boards.findByPk(id);

    return board;
  } catch (error) {
    throw ApiError.notFound('Cannot find', {
      board: 'Board not found',
    });
  }
};

export const getAll = async() => {
  try {
    const boards = await Boards.findAll();

    return boards;
  } catch (error) {
    throw ApiError.notFound('Cannot find boards', {
      board: 'Something went wrong',
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
  try {
    await Boards.destroy({
      where: {
        id,
      },
    });

    await cardsService.removeMany(id);
  } catch (error) {
    throw ApiError.cannotCreate('Cannot delete board');
  }
};

export const addToSorted = async(boardId, cardId) => {
  try {
    const board = await getOne(boardId);
    const sorted = [...board.sorted, cardId];

    await Boards.update({ sorted }, { where: { id: boardId } });

    return sorted;
  } catch (error) {
    throw ApiError.cannotPost('Cannot update sorted cards');
  }
};

export const removeFromSorted = async(boardId, cardId) => {
  try {
    const board = await getOne(boardId);
    const sorted = board.sorted.filter(id => id !== cardId);

    await Boards.update({ sorted }, { where: { id: boardId } });

    return sorted;
  } catch (error) {
    throw ApiError.cannotPost('Cannot update sorted cards');
  }
};

export const updateSorted = async(boardId, sorted) => {
  try {
    await Boards.update({ sorted }, { where: { id: boardId } });

    return sorted;
  } catch (error) {
    throw ApiError.cannotPost('Cannot update sorted cards');
  }
};
