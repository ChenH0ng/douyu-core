import {Transform,} from 'readable-stream';
import resolveHeader from './resolveHeader';

export default class DouyuMessageTransform extends Transform {
    _length = 0;
    _store = [];

    get _chunk() {
        if (this._store.length === 1)return this._store[0];
        this._store = [Buffer.concat(this._store)];
        return this._store[0];
    }

    set _chunk(value) {
        this._store = value ? [value] : [];
    }

    _Resolver = function*() {
        while (true) {
            let result = resolveHeader(this._chunk);
            while (result.length === 0) {
                yield;
                result = resolveHeader(this._chunk);
            }

            if (result.left) {
                this._chunk = result.left;
                this._length = result.left.length;
            }
            else {
                this._chunk = null;
                this._length = 0;
            }

            while (this._length < result.length)yield;
            const chunk = this._chunk;
            if (chunk.length === result.length) {
                this._chunk = null;
                this.push(chunk);
            }
            else {
                this._chunk = chunk.slice(result.length);
                this.push(chunk.slice(0, result.length));
            }
            yield;
        }
    };

    constructor() {
        super();
        this._resolve = this._Resolver.call(this);
    }

    _transform(chunk, encoding, callback) {
        this._store.push(chunk);
        this._length += chunk.length;
        this._resolve.next();
        callback();
    }
};