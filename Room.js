const createDouyuMessage = require('./createDouyuMessage');

class Room {
    constructor(id) {
        this.id = id;
        this.messages = {
            login: createDouyuMessage({
                type: 'loginreq',
                roomid: id,
            }),
            logout: createDouyuMessage({
                type: 'logout',
            }),
            get heart() {
                return createDouyuMessage({
                    type: 'keepalive',
                    tick: Date.now(),
                });
            },
            join: createDouyuMessage({
                type: 'joingroup',
                rid: id,
                gid: -9999,
            }),
        };
    }
}
module.exports = Room;