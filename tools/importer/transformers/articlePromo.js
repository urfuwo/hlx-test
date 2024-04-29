/* global WebImporter */
const NEWSLETTER_FILTER = /\b(subscribe|newsletter)\b/i;

const articlePromo = (main, document) => {
  // news
  const banners = document.querySelectorAll('.wp-block-sap-news-cta-banner');
  banners.forEach((banner) => {
    banner.querySelectorAll('.wp-block-button a').forEach((a) => {
      const wrapper = document.createElement('em');
      a.parentElement.append(wrapper);
      wrapper.append(a);
    });

    banner.querySelectorAll('.cta-banner__title').forEach((title) => {
      const wrapper = document.createElement('h3');
      title.parentElement.append(wrapper);
      wrapper.append(title);
    });

    if (NEWSLETTER_FILTER.test(banner.textContent)) {
      banner.remove();
      const newsletterFragmentLink = document.createElement('a');
      newsletterFragmentLink.href = 'https://main--hlx-test--urfuwo.hlx.page/fragments/news/newsletter-subscription';
      newsletterFragmentLink.textContent = newsletterFragmentLink.href;
      document.querySelector('div#page').append(newsletterFragmentLink);
    } else {
      const name = banner.classList.contains('alignleft') ? 'Promo (blue)' : 'Promo';
      const block = [[name], [banner.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      banner.replaceWith(table);
    }
  });

  // insights
  main.querySelectorAll('.notificationRibbon').forEach((ribbon) => {
    if (NEWSLETTER_FILTER.test(ribbon.textContent)) {
      ribbon.remove();
    } else {
      ribbon.querySelectorAll('[class^="NotificationRibbon__button--"]').forEach((a) => {
        const wrapper = a.className.includes('Button__primary--')
          ? document.createElement('strong')
          : document.createElement('em');
        a.parentElement.append(wrapper);
        wrapper.append(a);
      });

      ribbon.querySelectorAll('[class^="Image__wrapper--"]').forEach((img) => img.remove());
      const name = ribbon.classList.contains('alignleft') ? 'Promo (blue)' : 'Promo';
      const block = [[name], [ribbon.innerHTML]];
      const table = WebImporter.DOMUtils.createTable(block, document);
      ribbon.replaceWith(table);
    }
  });

  // insights newsletter
  main.querySelectorAll('div.section.reference').forEach((newsletterWrapper) => {
    if (newsletterWrapper.querySelector('h2')?.textContent.match(NEWSLETTER_FILTER)) {
      const newsletterFragmentLink = document.createElement('a');
      newsletterFragmentLink.href = 'https://main--hlx-test--urfuwo.hlx.page/fragments/insights/newsletter-subscription';
      newsletterFragmentLink.textContent = newsletterFragmentLink.href;
      newsletterWrapper.remove();
      document.querySelector('div#page').append(newsletterFragmentLink);
    }
  });
};

export default articlePromo;
