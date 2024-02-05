import express from 'express';
import { catchError } from '../utils/catchError.js';
import * as boardsController from '../controllers/boards.controller.js';

export const router = express.Router();

router.get('/:id', catchError(boardsController.get));
router.post('/', catchError(boardsController.post));
router.delete('/:id', catchError(boardsController.remove));
