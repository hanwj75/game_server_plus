import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { createUser, findUserByDeviceId, updateUserLogin } from "../../db/user/user.db.js";
import { addUser } from "../../session/user.session.js";
import { handlerError } from "../../utils/error/errorHandler.js";
import { createResponse } from "../../utils/response/createResponse.js";

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId } = payload;
    //강의 3-10 뭐한건지 모르겠음 나중에다시보셈
    let user = await findUserByDeviceId(deviceId);

    if (!user) {
      user = await createUser(deviceId);
    } else {
      await updateUserLogin(user.id);
    }

    addUser(socket, user.id);

    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: user.id },
      deviceId,
    );

    //뭔가 처리가 끝났을때 보내는 것
    socket.write(initialResponse);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default initialHandler;
