import { ApiError } from '../exeptions/api.error.js';
import * as cardsService from '../services/cards.service.js';
import * as boardsService from '../services/boards.service.js';

export const get = async(req, res) => {
  const { boardId } = req.params;

  if (!boardId) {
    throw ApiError.badRequest('Cards error', {
      cards: 'Board id is required',
    });
  }

  await boardsService.getById(boardId);

  const cards = await cardsService.getAll(boardId);

  res.send(cards);
};

export const post = async(req, res) => {
  const { boardId } = req.params;
  const { title, description } = req.body;

  if (!boardId) {
    throw ApiError.badRequest('Cards error', {
      cards: 'Board id is required',
    });
  }

  if (!title || typeof title !== 'string') {
    throw ApiError.badRequest('Title error', {
      title: 'Title is not valid',
    });
  }

  const card = await cardsService.create(boardId, { title, description });

  res.send(card);
};

export const remove = async(req, res) => {
  const { id } = req.params;

  const isExist = await cardsService.getOne(id);

  if (!isExist) {
    throw ApiError.notFound('Cannot delete', {
      card: 'Card not found',
    });
  }

  await cardsService.remove(id);

  res.sendStatus(204);
};

export const update = async(req, res) => {
  const { id } = req.params;
  const { status, title, description, boardId } = req.body;

  const isExist = await cardsService.getOne(id);

  if (!isExist) {
    throw ApiError.notFound('Cannot delete', {
      card: 'Card not found',
    });
  }

  if (!status || !title || !boardId) {
    throw ApiError.badRequest('Update error', {
      title: 'Status, title, boardId are required',
    });
  }

  await cardsService.update(id, {
    status,
    title,
    description,
    boardId,
  });

  const updatedTodo = await cardsService.getOne(id);

  res.send(cardsService.normalizedCard(updatedTodo));
};
