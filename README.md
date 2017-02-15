[![Douyu Logo](https://github.com/ChenH0ng/douyu-core/assets/logo.jpg)](https://www.douyu.com/)

## Installation
```
$ npm install douyu-core --save
```

## Example
```
import net from 'net';
import {deserialize, DouyuMessageTransform, Room, configs,} from 'douyu-core';
const dmt = new DouyuMessageTransform();
const options = {
    host: 'openbarrage.douyutv.com',
    port: 8601,
};
const client = net.createConnection(options, () => {
    const room = new Room(522423);
    client.write(room.messages.login);
    setInterval(() => client.write(room.messages.heart), configs.heartInterval);
    dmt.on('data', data => {
        const result = deserialize(data.toString());
        switch (result.type) {
            case 'loginres':
                client.write(room.messages.join);
                break;
            case 'chatmsg':
                console.log(`[${result.nn}]: ${result.txt}`);
                break;
        }
    });
});
client.pipe(dmt);
```
