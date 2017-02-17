[![Douyu Logo](http://139.196.50.70/douyulogo.jpg)](https://www.douyu.com/)

本模块的长远目标是实现所有斗鱼官方客户端的基础功能，目前提供弹幕接收。

## Installation
```
$ npm install douyu-core --save
```
## API

Exports:
- `Room`
- `serialize`
- `deserialize`
- `DouyuMessageTransform`
- `createDouyuMessage`

## Example
```
const net = require('net');
const {deserialize, DouyuMessageTransform, Room, configs,}  =require('../build/douyu-core');
const dmt = new DouyuMessageTransform();

const options = {
    host: 'openbarrage.douyutv.com',
    port: 8601,
};
const client = net.createConnection(options, () => {
    const room = new Room(65962);
    client.write(room.messages.login);
    setInterval(() => client.write(room.messages.heart), configs.heartInterval);
    dmt.on('data', data => {
        const result = deserialize(data.toString());
        switch (result.type) {
            case 'loginres':
                client.write(room.messages.join);
                break;
            case 'chatmsg':
                console.log(`${result.nn} > ${result.txt}`);
                break;
        }
    });
});
client.pipe(dmt);
```
