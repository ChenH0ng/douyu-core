export const headerLength = 8;
export const notBodyLength = 4 + headerLength;
export const types = {
    client: 689,
    server: 690,
};
export const offsets = {
    length: 0,
    headerLength: 4,
    headerTypes: 8,
};
export const heartInterval = 45 * 1000;