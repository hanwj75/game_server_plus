import { getGameSession } from "../../session/game.session.js";
import CustomError from "../../utils/error/customError.js";
import { ErrorCodes } from "../../utils/error/errorCodes.js";
import { handlerError } from "../../utils/error/errorHandler.js";

const updateLocationHandler = ({ socket, userId, payload }) => {
  try {
    const { gameId, x, y } = payload;
    const gameSession = getGameSession(gameId);
    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, `게임 세션 없음`);
    }
    const user = gameSession.getUser(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, `유저 세션 없음`);
    }
    user.updatePosition(x, y);
    const packet = gameSession.getAllLocation();
    socket.write(packet);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default updateLocationHandler;
