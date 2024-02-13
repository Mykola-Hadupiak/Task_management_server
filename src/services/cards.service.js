import { ApiError } from '../exeptions/api.error.js';
import { Cards } from '../models/cards.js';
import * as boardsService from './boards.service.js';

export const getOne = async(id) => {
  const isCardExist = await Cards.findOne({
    where: { id },
  });

  return isCardExist;
};

export const normalizedCard = (card) => {
  return {
    id: card.id,
    title: card.title,
    description: card.description,
    status: card.status,
    boardId: card.boardId,
  };
};

export const getAll = async(id) => {
  const cards = await Cards.findAll({
    where: {
      boardId: id,
    },
  });

  const normalizedCards = cards.map(card => normalizedCard(card));

  return normalizedCards;
};

export const create = async(boardId, { title, description }) => {
  try {
    const board = await boardsService.getById(boardId);

    if (!board) {
      throw ApiError.notFound('Cannot find', {
        board: 'Board not found',
      });
    }

    const card = await Cards.create({ title, description, boardId });

    await boardsService.addToSorted(boardId, card.id);

    const normalized = normalizedCard(card);

    return normalized;
  } catch (error) {
    throw ApiError.cannotPost('Cannot create a new card');
  }
};

export const remove = async(id) => {
  try {
    const card = await getOne(id);
    const boardId = card.boardId;

    await Cards.destroy({
      where: {
        id,
      },
    });

    await boardsService.removeFromSorted(boardId, card.id);
  } catch (error) {
    throw ApiError.cannotPost('Cannot delete');
  }
};

export const removeMany = async(boardId) => {
  try {
    await Cards.destroy({
      where: {
        boardId,
      },
    });
  } catch (error) {
    throw ApiError.cannotPost('Cannot delete cards');
  }
};

export const update = async(id, data) => {
  try {
    await Cards.update({ ...data }, {
      where: { id },
    });

    const updatedCard = await getOne(id);

    return updatedCard;
  } catch (error) {
    throw ApiError.cannotPost('Cannot update cards');
  }
};
