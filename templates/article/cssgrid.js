import { div } from '../../scripts/dom-builder.js';

/**
 * Move all non-hero banner and non-related content sections into a dedicated wrapper
 * Move all related content sections into a dedicated wrapper
 * Expected Result: Areas that contain a single section (hero, pagenav, rightcolumn) are
 * direct children of main, while
 * all text body sections are wrapped in a container 'textbody-grid-area' and
 * all related content sections are wrapped in a container 'related-content-grid-area'
 * @param main
 */
export default function adaptForMultiSectionCSSGrid(main) {
  /* Extract the hero section into its own section */
  let extractedHeroSection = null;
  const heroWrapper = main.querySelector(':scope > div.section.hero-container > .hero-wrapper');
  if (heroWrapper) {
    const existingHeroSection = heroWrapper.parentNode;
    extractedHeroSection = div({ class: 'section hero-container' });
    extractedHeroSection.append(heroWrapper);
    existingHeroSection.classList.remove('hero-container');
  }
  /* Extract the related content sections into its own area */
  const rcSectionsGridArea = div({ class: 'related-content-grid-area' });
  main.querySelectorAll(':scope > div.section.related-articles-container').forEach((rc) => {
    rcSectionsGridArea.append(rc);
  });
  const bodyGridArea = div({ class: 'body-grid-area' });
  main.querySelectorAll(':scope > div.section').forEach((section) => {
    bodyGridArea.append(section);
  });
  /* Finally */
  /* Add the hero section back in */
  if (extractedHeroSection) {
    main.append(extractedHeroSection);
  }
  if (bodyGridArea.hasChildNodes()) {
    main.append(bodyGridArea);
  }
  /* Add the related-content grid-area back in */
  if (rcSectionsGridArea.hasChildNodes()) {
    main.append(rcSectionsGridArea);
  } else {
    rcSectionsGridArea.remove();
  }
}
