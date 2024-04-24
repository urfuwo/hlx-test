/* global WebImporter */
// eslint-disable-next-line no-unused-vars
const sectionBar = (main, document) => {
  const container = main.querySelector('div.container');
  const newContainer = document.createElement('div');
  newContainer.classList.add('container');
  newContainer.append(document.createElement('hr'));
  let section;
  main.querySelectorAll('div.vc_row').forEach((row, index) => {
    // find divs with vc h1 headers as thats where a section starts
    // then find all the contents of the section ie. till we reach another h1 tag
    // wrap the content from one h1 till another h1 in div.section

    if (row.querySelectorAll('h1').length !== 0) {
      if (index !== 0) {
        newContainer.append(section);
        // if section is when to use, push a tool tip section
        if (section.querySelector('h1').textContent === 'When to Use') {
          const toolTipSections = document.createElement('div');
          toolTipSections.classList.add('section');
          toolTipSections.textContent = 'Tool Tip Section';
          newContainer.append(toolTipSections);
        }
        newContainer.append(document.createElement('hr'));
        // if section is variants, push a behaviour&interaction and a localization section
        if (section.querySelector('h1').textContent === 'Variants') {
          const behaviourSections = document.createElement('div');
          behaviourSections.classList.add('section');
          const headerForBehaviourSection = document.createElement('h1');
          headerForBehaviourSection.textContent = 'Behaviour & Interaction';
          behaviourSections.append(headerForBehaviourSection);
          newContainer.append(behaviourSections);
          newContainer.append(document.createElement('hr'));

          const localizationSections = document.createElement('div');
          localizationSections.classList.add('section');
          const headerForLocallizationSection = document.createElement('h1');
          headerForLocallizationSection.textContent = 'Localization';
          localizationSections.append(headerForLocallizationSection);
          newContainer.append(localizationSections);
          newContainer.append(document.createElement('hr'));
        }
      }

      section = document.createElement('div');
      section.classList.add('section');
      section.append(row);
    } else {
      section.append(row);
    }
  });

  newContainer.append(section);
  newContainer.append(document.createElement('hr'));

  newContainer.querySelectorAll('div.section').forEach((sectionW) => {
    const header = sectionW.querySelector('h1');
    if (header?.textContent === 'When to Use') {
      header.remove();
      const col1 = sectionW.querySelectorAll('div.vc_column_container')[1];
      col1.after(document.createElement('hr'));
      const block = [['When To Use'], [sectionW.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);

      sectionW.innerHTML = '';
      sectionW.append(header);
      sectionW.append(table);
    }

    const sectionTextContent = sectionW.textContent;
    if (sectionTextContent === 'Tool Tip Section') {
      sectionW.textContent = '';
      const divTip = document.createElement('div');
      const list = document.createElement('ul');
      const listItem1 = document.createElement('li');
      listItem1.textContent = 'This is a tip';
      const listItem2 = document.createElement('li');
      listItem2.textContent = 'This is another tip';
      const listItem3 = document.createElement('li');
      listItem3.textContent = 'And this is the last one and longer tip';
      list.append(listItem1);
      list.append(listItem2);
      list.append(listItem3);
      divTip.append(list);
      sectionW.append(divTip);
      // add top tips table after the when to use section
      const blockTip = [['Top Tips'], [sectionW.innerHTML]];
      const tableTip = WebImporter.DOMUtils.createTable(blockTip, document);
      sectionW.replaceWith(tableTip);
    }

    if (header?.textContent === 'Behaviour & Interaction') {
      const sectionMetadataTable = WebImporter.DOMUtils.createTable([['Section Metadata'], ['Style', 'hidden']], document);

      sectionW.append(sectionMetadataTable);
    }

    if (header?.textContent === 'Localization') {
      const sectionMetadataTable = WebImporter.DOMUtils.createTable([['Section Metadata'], ['empty', 'true']], document);

      sectionW.append(sectionMetadataTable);
    }
  });

  container.replaceWith(newContainer);
};

export default sectionBar;
