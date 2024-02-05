import express from 'express';
import { catchError } from '../utils/catchError.js';
import * as cardsController from '../controllers/cards.controller.js';

export const router = express.Router();

router.get('/:boardId', catchError(cardsController.get));
router.post('/:boardId', catchError(cardsController.post));
router.delete('/:id', catchError(cardsController.remove));
router.put('/:id', catchError(cardsController.update));
