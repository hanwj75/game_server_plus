import { addGameSession } from "../../session/game.session.js";
import { getUserById } from "../../session/user.session.js";
import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { v4 as uuidv4 } from "uuid";
import { createResponse } from "../../utils/response/createResponse.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";

const createGameHandler = ({ socket, userId, payload }) => {
  try {
    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);

    const user = getUserById(userId);
    //세션에 유저가 없을경우
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, `유저를 찾을수 없음`);
    }
    //user세션에 유저가 존재 할 경우
    gameSession.addUser(user);
    const createGameResponse = createResponse(HANDLER_IDS.CREATE_GAME, RESPONSE_SUCCESS_CODE, {
      gameId,
      message: `게임이 생성됨`,
      userId,
    });
    socket.write(createGameResponse);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default createGameHandler;
