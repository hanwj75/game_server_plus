import { gameStartNotification } from "../../utils/notification/game.notification.js";
import IntervalManager from "../managers/interval.manager.js";

const MAX_PLAYERS = 4;

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.intervalManager = new IntervalManager();
    this.state = "waiting"; //'waiting'과 'inProgress' 의 2가지 상태값을 가지도록
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error(`최대인원수임`);
    }
    this.users.push(user);
    //유저의 수가 최대치라면 일정시간후 자동으로 게임이 시작되게 하는 로직

    this.intervalManager.addPlayer(user.id, user.ping.bind(user), 1000);

    if (this.users.length === MAX_PLAYERS) {
      setTimeout(() => {
        this.startGame();
      }, 3000);
    }
  } // 유저 생성

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  } // 유저 조회

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
    this.intervalManager.removePlayer(userId);
    //게임 시작중 유저가 나가거나 쫒겨날 경우 상태값을 다시 대기중으로 변경
    if (this.users.length < MAX_PLAYERS) {
      this.state = "waiting";
    }
  } // 유저 삭제

  getMaxLatency() {
    let maxLatency = 0;
    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });
    return maxLatency;
  }

  startGame() {
    this.state = "inProgress"; //게임이 시작하면 상태값을 게임중으로 바꿈
    const startPacket = gameStartNotification(this.id, Date.now());

    this.users.forEach((user) => {
      user.socket.write(startPacket);
    });
  } // 게임 시작

  getAllLocation() {
    const maxLatency = this.getMaxLatency();

    const locationData = this.users.map((user) => {
      const { x, y } = user.calcuatePosition(maxLatency);
      return { id: user.id, x, y };
    });
    return createLocationPacket(locationData);
  }
}

export default Game;
