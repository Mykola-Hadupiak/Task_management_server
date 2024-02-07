import express from 'express';
import { catchError } from '../utils/catchError.js';
import * as boardsController from '../controllers/boards.controller.js';

export const router = express.Router();

router.get('/', catchError(boardsController.get));
router.get('/:id', catchError(boardsController.getOne));
router.post('/', catchError(boardsController.post));
router.delete('/:id', catchError(boardsController.remove));
