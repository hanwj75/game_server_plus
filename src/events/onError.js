import { removeUser } from "../session/user.session.js";
import CustomError from "../utils/error/customError.js";
import { handlerError } from "../utils/error/errorHandler.js";

export const onError = (socket) => (err) => {
  console.error(err, "소켓 에러났음 ");
  handlerError(socket, new CustomError(500, `소켓 오류:${err.message}`));
  removeUser(socket);
};
