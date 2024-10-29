import { gameSessions, userSessions } from "../session/sessions.js";
import { removeUser } from "../session/user.session.js";

export const onEnd = (socket) => () => {
  console.log(`클라이언트 연결 종료됨`);
  console.log(userSessions);
  console.log(gameSessions);

  //세션에서 유저 삭제
  removeUser(socket);
};
