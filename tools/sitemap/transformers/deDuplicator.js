/* eslint-disable no-underscore-dangle */
const { Transform } = require('stream');

class DeDuplicator extends Transform {
  constructor(options) {
    super({ ...options, objectMode: true });
    this.seenElements = new Set(); // To track seen elements
  }

  _transform(chunk, encoding, callback) {
    chunk.split(',').forEach((entry) => {
      const element = entry.trim();
      if (!this.seenElements.has(element)) {
        this.seenElements.add(element);
        this.push(element);
      }
    });
    callback();
  }
}

module.exports = {
  DeDuplicator,
};
