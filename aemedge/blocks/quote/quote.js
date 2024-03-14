export default function decorate(block) {
  const qtContent = block.querySelector(':scope > div:first-of-type > div');
  const qsContent = block.querySelector(':scope > div:nth-of-type(2) > div');
  qtContent.classList.add('col', 'content');
  qtContent.parentNode.classList.add('qt');
  if (qsContent) {
    qsContent.classList.add('col', 'content');
    qsContent.parentNode.classList.add('qs');
  } else {
    qtContent.parentNode.classList.add('qt single-qt');
  }
}
