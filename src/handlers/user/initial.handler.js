import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";

const initialHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId } = payload;

    addUser(socket, deviceId);

    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: deviceId },
      deviceId,
    );

    //뭔가 처리가 끝났을때 보내는 것
    socket.write(initialResponse);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default initialHandler;
