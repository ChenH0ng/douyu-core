import {totalHeaderLength, headerLength, offsets,} from './configs';

export default chunk => {
    if (chunk.length < totalHeaderLength) {
        return {
            length: 0,
            left: null,
        };
    }
    return {
        length: chunk.readUInt32LE(offsets.length1) - headerLength,
        left: chunk.length > totalHeaderLength ? chunk.slice(totalHeaderLength) : null,
    }
};