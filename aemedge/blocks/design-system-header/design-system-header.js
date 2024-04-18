import decorateHeader from '../header/header.js';

export default async function decorate(block) {
  console.log('decorating design system header');
  decorateHeader(block);
}
