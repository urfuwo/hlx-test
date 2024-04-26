import { decorateButtons } from '../../scripts/aem.js';

export default async function decorate(block) {
  console.log(block);
  decorateButtons(block);
}
