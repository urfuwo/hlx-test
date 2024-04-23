// eslint-disable-next-line no-unused-vars
const sectionTitle = (main, document) => {
  main.querySelectorAll('div.tooltip-inner').forEach((element) => {
    element.remove();
  });
};

export default sectionTitle;
