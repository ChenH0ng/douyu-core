const Transform = require('stream').Transform;
const resolveHeader = require('./resolveHeader');

class Dymt extends Transform {
    constructor() {
        super();
        this._store = [];
        this._currentLength = 0;
        this._dataLength = 0;
    }

    _resolve(chunk) {
        let length, left;
        if (this._dataLength > 0) {
            length = this._dataLength;
            left = chunk;
        }
        else {
            let result = resolveHeader(chunk);
            length = result.length;
            left = result.left;
        }
        if (length > 0 && left && left.length >= length) {
            this._dataLength = 0;
            this.push(left.slice(0, length));
            if (left.length > length) this._resolve(left.slice(length));
        }
        else {
            this._dataLength = length;
            if (left) {
                this._currentLength = left.length;
                this._store.push(left);
            }
            else this._currentLength = 0;
        }
    }

    _transform(chunk, encoding, callback) {
        if (this._dataLength) {
            this._currentLength += chunk.length;
            this._store.push(chunk);
            if (this._currentLength >= this._dataLength) {
                const buffers = this._store;
                this._store = [];
                this._resolve(Buffer.concat(buffers));
            }
        }
        else this._resolve(chunk);
        callback();
    }
}
module.exports = Dymt;