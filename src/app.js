/* eslint-disable no-console */
import express from 'express';
import 'dotenv/config';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { router as cardsRouter } from './routes/cards.route.js';
import { router as boardsRouter } from './routes/boards.route.js';

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use('/boards', boardsRouter);
app.use('/cards', cardsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
