import {notBodyLength, headerLength, offsets,} from './configs';

export default chunk => {
    if (chunk.length < notBodyLength) {
        return {
            length: 0,
            left: null,
        };
    }
    return {
        length: chunk.readUInt32LE(offsets.length) - headerLength,
        left: chunk.length > notBodyLength ? chunk.slice(notBodyLength) : null,
    }
};