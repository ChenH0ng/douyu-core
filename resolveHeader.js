const {totalHeaderLength, headerLength, offsets,}=require('./configs');

module.exports = chunk => {
    if (chunk.length < totalHeaderLength) {
        return {
            length: -1,
            left: null,
        };
    }
    return {
        length: chunk.readUInt32LE(offsets.length1) - headerLength,
        left: chunk.length > totalHeaderLength ? chunk.slice(totalHeaderLength) : null,
    }
};