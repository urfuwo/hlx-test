import { loadCSS } from '../../scripts/aem.js';
import { div } from '../../scripts/dom-builder.js';
import Avatar from '../avatar/avatar.js';

export default class Profiles {
  constructor(profileDefs = [], nameKey = 'name') {
    this.profileDefs = profileDefs;
    this.nameKey = nameKey;
  }

  render(excludeStyles) {
    if (!excludeStyles) {
      loadCSS(`${window.hlx.codeBasePath}/libs/profiles/profiles.css`);
    }
    const multipleProfiles = this.profileDefs.length > 1;
    return div(
      { class: multipleProfiles ? `profiles elems${this.profileDefs.length}` : 'profiles vertical' },
      ...this.profileDefs.map((profileDef) => div(
        { class: multipleProfiles ? 'profile hor' : 'profile' },
        new Avatar(
          profileDef[this.nameKey],
          profileDef.title,
          profileDef.description,
          profileDef.path,
          profileDef.image,
        ).renderDetails('big'),
      )),
    );
  }
}
