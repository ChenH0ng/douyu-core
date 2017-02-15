import serialize from './serialize';
import {headerLength, totalHeaderLength, offsets, types,} from './configs';

export default (json, options = {}) => {
    const header = Buffer.alloc(totalHeaderLength);
    const body = serialize(json);
    const bodyLength = Buffer.byteLength(body);
    const msgLength = headerLength + bodyLength;
    header.writeUInt32LE(msgLength, offsets.length1);
    header.writeUInt32LE(msgLength, offsets.length2);
    header.writeUInt16LE(options.type || types.client, offsets.types);
    return Buffer.concat([header, Buffer.alloc(bodyLength, body)], totalHeaderLength + bodyLength);
};