[![Douyu Logo](http://139.196.50.70/douyulogo.jpg)](https://www.douyu.com/)

##Tip
请先阅读[官方文档](http://dev-bbs.douyutv.com/forum.php?mod=forumdisplay&fid=37)

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
const {deserialize, DouyuMessageTransform, Room, configs,} = require('douyu-core');
const dmt = new DouyuMessageTransform();

const options = {
    host: 'openbarrage.douyutv.com',
    port: 8601,
};
const client = net.createConnection(options, () => {
    const room = new Room(65962);//房间id
    client.write(room.messages.login);
    setInterval(() => client.write(room.messages.heart), configs.heartInterval);//心跳包
    dmt.on('data', data => {
        const result = deserialize(data.toString());
        switch (result.type) {
            case 'loginres':
                client.write(room.messages.join);
                break;
            case 'chatmsg'://弹幕消息
                console.log(`${result.nn} > ${result.txt}`);
                break;
        }
    });
});
client.pipe(dmt);
```
