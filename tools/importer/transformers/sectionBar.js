// eslint-disable-next-line no-unused-vars
const sectionBar = (main, document) => {
  const container = main.querySelector('div.container');
  const newContainer = document.createElement('div');
  newContainer.classList.add('container');
  let section;
  main.querySelectorAll('div.vc_row').forEach((row, index) => {
    // find divs with vc h1 headers as thats where a section starts
    // then find all the contents of the section ie. till we reach another h1 tag
    // wrap the content from one h1 till another h1 in div.section

    if (row.querySelectorAll('h1').length !== 0) {
      if (index !== 0) {
        newContainer.append(section);
        newContainer.append('--- ');
      }

      section = document.createElement('div');
      section.classList.add('section');
      section.append(row);
    } else {
      section.append(row);
    }
  });

  newContainer.append(section);
  newContainer.append('--- ');
  container.replaceWith(newContainer);
};

export default sectionBar;
