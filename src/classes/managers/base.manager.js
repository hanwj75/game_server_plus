//앞으로 만들 다양한 매니저의 부모 클래스 생성

class BaseManager {
  constructor() {
    if (new.target === BaseManager) {
      throw new TypeError("BaseManager로 인스턴스를 생성할수없음");
    }
  }

  addPlayer(playerId, ...args) {
    throw new Error(`그냥은 사용할수없음`);
  }

  removePlayer() {
    throw new Error(`그냥은 사용할수없음`);
  }

  clearAll() {
    throw new Error(`그냥은 사용할수없음`);
  }
}

export default BaseManager;
//3-15
