const extractTags = (main, document) => {
  const tagLists = document.querySelectorAll('.tags-links');
  tagLists.forEach((tagList) => {
    const metaData = document.querySelector('table#metadata');
    const tr = document.createElement('tr');
    const tdKey = document.createElement('td');
    tdKey.innerText = 'Tags';
    const tdValue = document.createElement('td');
    const tags = [];
    tagList.querySelectorAll('a').forEach((tag) => {
      tags.push(tag.innerText);
    });
    tdValue.innerText = tags.join(', ');
    tr.append(tdKey, tdValue);
    metaData.append(tr);
    tagList.remove();
  });
};
export default extractTags;
