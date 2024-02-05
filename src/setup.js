import { Boards } from './models/boards.js';
import { Cards } from './models/cards.js';

Cards.sync({ force: true });
Boards.sync({ force: true });
