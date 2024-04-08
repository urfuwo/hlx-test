/* eslint-disable no-underscore-dangle */
const { Transform } = require('stream');

class Collector extends Transform {
  constructor(options) {
    super({ ...options, objectMode: true });
    this.collection = new Set();
  }

  _transform(chunk, encoding, callback) {
    chunk.split(',').forEach((entry) => {
      this.collection.add(entry.trim());
      this.push(entry.trim());
    });

    callback();
  }

  _flush(callback) {
    // Emit the unique elements from the Set
    for (const element of this.collection) {
      this.push(element);
    }
    callback();
  }

  getCollection() {
    return this.collection;
  }
}

module.exports = {
  Collector,
};
