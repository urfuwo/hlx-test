/* eslint-disable no-underscore-dangle */
import { Transform } from 'stream';

export default class Filter extends Transform {
  constructor(transformFunction, options) {
    super({ ...options, objectMode: true });
    this.transformFunction = transformFunction;
  }

  _transform(chunk, encoding, callback) {
    try {
      if (this.transformFunction(chunk) === true) {
        this.push(chunk);
      }
      callback();
    } catch (error) {
      callback(error);
    }
  }
}
