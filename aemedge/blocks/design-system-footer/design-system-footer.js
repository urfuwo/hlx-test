import decorateFooter from '../footer/footer.js';

export default async function decorate(block) {
  console.log('decorating design system footer');
  block.classList.add('footer');
  decorateFooter(block);
}
