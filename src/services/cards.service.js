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
    const normalized = normalizedCard(card);

    return normalized;
  } catch (error) {
    throw ApiError.cannotPost('Cannot create a new card');
  }
};

export const remove = async(id) => {
  try {
    await Cards.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    throw ApiError.cannotPost('Cannot delete');
  }
};

export const update = async(id, data) => {
  await Cards.update({ ...data }, {
    where: { id },
  });
};
