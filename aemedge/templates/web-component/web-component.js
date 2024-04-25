import { div, nav } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';

function decorate(doc) {
  const main = doc.querySelector('main');
  const mainNavContainer = nav();
  main.parentNode.insertBefore(mainNavContainer, main);

  // get first section and all the others
  const [firstSection, ...otherSections] = main.children;

  const sectionDividers = [
    {
      sectionName: 'Usage',
      firstSectionTitle: 'Intro',
    },
    {
      sectionName: 'Style',
      firstSectionTitle: 'Styles intro',
    },
    {
      sectionName: 'Accessibility',
      firstSectionTitle: 'Accessibility intro',
    },
    {
      sectionName: 'Code',
      firstSectionTitle: 'Code intro',
    },
  ];

  let currentTabName;
  let currentTabSections = [];
  let sectionDividerIndex = 0;
  const blockContent = [];

  otherSections.forEach((section) => {
    if (section.querySelector('h1')?.textContent === sectionDividers[sectionDividerIndex].firstSectionTitle) {
      if (currentTabName) {
        blockContent.push([currentTabName, div(...currentTabSections)]);
      }
      currentTabName = sectionDividers[sectionDividerIndex].sectionName;
      currentTabSections = [section];
      sectionDividerIndex += 1;
    } else {
      currentTabSections.push(section);
    }
  });
  blockContent.push([currentTabName, currentTabSections]);

  console.log('blockContent', blockContent);
  const tabBlock = buildBlock('tabs', blockContent);

  const tabSection = div(tabBlock);

  main.replaceChildren(firstSection, tabSection);
}

decorate(document);
