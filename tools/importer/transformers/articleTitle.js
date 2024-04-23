// eslint-disable-next-line no-unused-vars
const articleTitle = (main, document) => {
  const header = main.querySelectorAll('header')[0];
  const title = header.querySelector('h1.entry-title');
  const subtitle = header.querySelector('h3#subtitle');

  const newHeader = document.createElement('div');
  newHeader.append(title);
  newHeader.append(subtitle);

  header.replaceWith(newHeader);
};

export default articleTitle;
