export default function decorate(block) {
  const qtContent = block.querySelector(':scope > div:first-of-type > div');
  qtContent.classList.add('col', 'content');
  qtContent.parentNode.classList.add('qt');
  const qsContent = block.querySelector(':scope > div:nth-of-type(2) > div');
  qsContent.classList.add('col', 'content');
  qsContent.parentNode.classList.add('qs');
}
