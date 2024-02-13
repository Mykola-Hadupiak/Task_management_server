import { ApiError } from '../exeptions/api.error.js';
import * as boardsService from '../services/boards.service.js';

export const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    throw ApiError.badRequest('Board error', {
      board: 'Board id is required',
    });
  }

  const board = await boardsService.getOne(id);

  res.send(board);
};

export const get = async(req, res) => {
  const boards = await boardsService.getAll();

  res.send(boards);
};

export const post = async(req, res) => {
  const board = await boardsService.create();

  res.send(board);
};

export const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    throw ApiError.badRequest('Board error', {
      board: 'Board id is required',
    });
  }

  const board = await boardsService.getOne(id);

  if (!board) {
    throw ApiError.notFound('Cannot find board', {
      board: 'Board not found',
    });
  }

  await boardsService.remove(id);

  res.sendStatus(204);
};

export const updateSorted = async(req, res) => {
  const { id } = req.params;
  const { sorted } = req.body;

  if (!id || !sorted) {
    throw ApiError.badRequest('Board error', {
      board: 'Board id and sorted are required',
    });
  }

  const board = await boardsService.getOne(id);

  if (!board) {
    throw ApiError.notFound('Cannot find board', {
      board: 'Board not found',
    });
  }

  const updatedSorted = await boardsService.updateSorted(id, sorted);

  res.send(updatedSorted);
};
