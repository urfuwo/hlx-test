const path = require('path');

// vite.config.js
export default {
  // config options
  build: {
    lib: {
      entry: [path.resolve(__dirname, 'entry-points/entry-button.js'), path.resolve(__dirname, 'entry-points/entry-breadcrumbs.js')],
      formats: ['esm'],
    },
    minify: false,
  },
};
