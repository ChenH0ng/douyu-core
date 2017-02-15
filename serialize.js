module.exports = json => {
    if (json.txt) {
        json.txt = json.txt.replace(/\/|@/, c => {
            switch (c) {
                case '/':
                    return '@S';
                case '@':
                    return '@A';
            }
        });
    }
    let result = '';
    for (let prop in json) {
        result += prop + '@=' + json[prop] + '/';
    }
    return result + '\0';
};