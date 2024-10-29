import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { getGameSession } from "../../session/game.session.js";
import { getUserById } from "../../session/user.session.js";
import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";

const joinGameHandler = ({ socket, userId, payload }) => {
  try {
    //게임 참가
    const { gameId } = payload;
    const gameSession = getGameSession(gameId);
    //게임이 없을경우
    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, "게임 세션을 찾을 수 없음");
    }

    //본인의 계정이 세션에 등록 되었는가
    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, `유저를 찾을 수 없음`);
    }
    const existUser = gameSession.getUser(user.id);
    if (!existUser) {
      gameSession.addUser(user);
    }

    const joinGameResponse = createResponse(
      HANDLER_IDS.JOIN_GAME,
      RESPONSE_SUCCESS_CODE,
      { gameId, message: "게임에 참가함" },
      user.id,
    );
  } catch (err) {
    handlerError(socket, err);
  }
};
export default joinGameHandler;
