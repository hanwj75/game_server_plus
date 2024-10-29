import { createPingPacket } from "../../utils/notification/game.notification.js";

class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.sequence = 0;
    this.lastUpdateTime = Date.now();
  }
  updatePostion(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  getNextSequence() {
    return ++this.sequence;
  }

  //3-14
  ping() {
    const now = Date.now();

    console.log(`[${this.id}] ping`);
    this.socket.write(createPingPacket(now));
  }
  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    console.log(`pong from 유저어쩌구 ${this.id} at ${now} 레이턴시:${this.latency}`);
  }

  caculatePosition(latency) {
    const timeDiff = latency / 1000; // 초단위
    const speed = 1; //속력
    const distance = speed * timeDiff;

    return {
      x: this.x + distance,
      y: this.y,
    };
  }
}

export default User;
