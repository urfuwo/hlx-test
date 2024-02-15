const path = require('path');

export default {
  build: {
    lib: {
      entry: [path.resolve(__dirname, 'entry-points/entry-udex-hero-banner.js')],
      formats: ['esm'],
    },
  },
};
