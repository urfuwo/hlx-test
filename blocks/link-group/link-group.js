export default async function decorate(block) {
  block.addEventListener('click', () => {
    block.classList.toggle('active');
    block.parentNode.parentNode.querySelectorAll('.link-group').forEach((linkGroup) => {
      if (linkGroup !== block) {
        linkGroup.classList.remove('active');
      }
    });
  });
}