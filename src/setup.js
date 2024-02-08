import { Boards } from './models/boards.js';
import { Cards } from './models/cards.js';

export default function main() {
  try {
    Cards.sync({ force: true });
    Boards.sync({ force: true });
    // eslint-disable-next-line no-console
    console.log('Successfully synced models');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error syncing models:', error);
  }
}

main();
