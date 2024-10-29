import { v4 as uuidv4 } from "uuid";
import { addGameSession } from "../../session/game.session.js";
import { createResponse } from "../../utils/response/createResponse.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { getUserById } from "../../session/user.session.js";
import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";

const createGameHandler = ({ socket, userId, payload }) => {
  try {
    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);

    const user = getUserById(userId);
    console.log("User ID:", userId);
    //세션에 유저가 없을경우
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, "유저를 찾을 수 없습니다.");
    }
    //user세션에 유저가 존재 할 경우
    gameSession.addUser(user);

    const createGameResponse = createResponse(
      HANDLER_IDS.CREATE_GAME,
      RESPONSE_SUCCESS_CODE,
      { gameId, message: "게임이 생성되었습니다." },
      userId,
    );

    socket.write(createGameResponse);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default createGameHandler;
