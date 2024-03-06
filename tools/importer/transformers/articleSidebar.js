/* global WebImporter */
const promoHelper = (img, headline, button) => {
  const heading = document.createElement('h3');
  heading.textContent = headline;
  button.textContent = 'Learn more';
  const block = [['Promo'], [img, heading, button]];
  return WebImporter.DOMUtils.createTable(block, document);
};

const articleSidebar = (main, document) => {
  const sidebarElements = document.querySelector(
    'section#main > aside div.related-content-container',
  );
  if (sidebarElements) {
    let contentEntryPoints = [...document.querySelectorAll('section#main > article > div.entry-content > h2, section#main > article > div.entry-content > h3')];
    if (contentEntryPoints?.length === 0) {
      // if the document has no headings, use paragraphs as entry points
      contentEntryPoints = [...document.querySelectorAll('section#main > article > div.entry-content > p')];
    }

    // move first promo before the first heading in the text
    const firstEntry = sidebarElements.querySelector('ul[data-position="top"] > li');
    if (firstEntry) {
      contentEntryPoints[0].before(
        promoHelper(
          firstEntry.querySelector('img'),
          firstEntry.querySelector('a').textContent,
          firstEntry.querySelector('a'),
        ),
      );
    }

    // move second promo somewhere in the middle of the text
    const middleEntry = sidebarElements.querySelector('ul[data-position="middle"] > li');
    if (middleEntry) {
      contentEntryPoints[Math.floor(contentEntryPoints.length / 2)].after(
        promoHelper(
          middleEntry.querySelector('img'),
          middleEntry.querySelector('a').textContent,
          middleEntry.querySelector('a'),
        ),
      );
    }

    const bottomEntry = sidebarElements.querySelector('ul[data-position="bottom"] > li');
    if (bottomEntry) {
      if (bottomEntry.querySelector('a[href*="sap-news-center-newsletter"]')) {
        // move last element (newsletter) to the end of the page
        const heading = document.createElement('h3');
        heading.textContent = bottomEntry.querySelector('a').textContent;
        bottomEntry.querySelector('a').textContent = 'Subscribe now';
        const block = [
          ['Promo (Newsletter)'],
          [bottomEntry.querySelector('img'), heading, bottomEntry.querySelector('a')],
        ];
        const table = WebImporter.DOMUtils.createTable(block, document);
        bottomEntry.remove();
        main.querySelector('div#more-posts').append(table);
      } else {
        // keep it in the content as last element
        contentEntryPoints[0]
          .closest('div.entry-content')
          .append(
            promoHelper(
              bottomEntry.querySelector('img'),
              bottomEntry.querySelector('a').textContent,
              bottomEntry.querySelector('a'),
            ),
          );
      }
    }
    sidebarElements.remove();
  }
};
export default articleSidebar;
