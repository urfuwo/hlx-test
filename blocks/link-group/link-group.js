export default async function decorate(block) {
  block.addEventListener('click', () => {
    block.classList.toggle('active');
  });
}
