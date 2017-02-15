module.exports = data => {
    data = data.slice(0, data.length - 1).split('/');
    data.pop();
    let info = {};
    for (let item of data) {
        const kv = item.split('@=');
        kv[1] = kv[1] || '';
        if (kv[0] === 'txt') {
            kv[1] = kv[1].replace(/@(S|A)/g, text => {
                switch (text[1]) {
                    case 'S':
                        return '/';
                    case 'A':
                        return '@';
                }
            });
        }
        info[kv[0]] = kv[1];
    }
    return info;
};