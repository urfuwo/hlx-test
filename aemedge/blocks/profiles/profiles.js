import Profile from '../../libs/profile/profile.js';

export default function decorate(block) {
  const multipleProfiles = block.children.length > 1;
  [...block.children].forEach((profileEl) => {
    const name = profileEl.querySelector('div:nth-child(1) h2').textContent || '';
    const description = profileEl.querySelector('div:nth-child(1) p')?.textContent || '';
    const image = profileEl.querySelector('div:nth-child(2) img');
    block.append(new Profile(name, name, description, '', image.src)
      .render(false, multipleProfiles));
    profileEl.remove();
  });
  if (multipleProfiles) {
    block.classList.add(`elems${block.children.length}`);
  } else {
    block.classList.add('vertical');
  }
}
