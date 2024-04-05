import Profiles from '../../libs/profiles/profiles.js';

export default function decorate(block) {
  const defs = [...block.children].map((profileEl) => {
    const name = profileEl.querySelector('div:nth-child(1) h2').textContent || '';
    const description = profileEl.querySelector('div:nth-child(1) p')?.textContent || '';
    const image = profileEl.querySelector('div:nth-child(2) img');
    return { name, description, image: image.src };
  });
  const profiles = new Profiles(defs).render();
  profiles.classList.add(...block.classList);
  block.replaceWith(profiles);
}
