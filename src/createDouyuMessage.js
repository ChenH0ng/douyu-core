import serialize from './serialize';
import {headerLength, notBodyLength, offsets, types,} from './configs';

export default (data, options = {}) => {
    const notBody = Buffer.alloc(notBodyLength);
    const body = serialize(data);
    const bodyLength = Buffer.byteLength(body);
    const msgLength = headerLength + bodyLength;
    notBody.writeUInt32LE(msgLength, offsets.length);
    notBody.writeUInt32LE(msgLength, offsets.headerLength);
    notBody.writeUInt16LE(options.type || types.client, offsets.headerTypes);
    return Buffer.concat([notBody, Buffer.alloc(bodyLength, body)], notBodyLength + bodyLength);
};