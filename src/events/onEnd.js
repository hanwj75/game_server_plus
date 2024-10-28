import { removeUser } from "../session/user.session.js";

export const onEnd = (socket) => () => {
  //세션에서 유저 삭제
  removeUser(socket);
};
