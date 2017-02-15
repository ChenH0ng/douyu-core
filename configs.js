const frameHeaderLength = 4;
const headerLength = 8;
const totalHeaderLength = frameHeaderLength + headerLength;
const types = {
    client: 689,
    server: 690,
};
const offsets = {
    length1: 0,
    length2: 4,
    types: 8,
};
const heartInterval = 45 * 1000;
module.exports = {
    frameHeaderLength,
    headerLength,
    totalHeaderLength,
    types,
    offsets,
    heartInterval,
};