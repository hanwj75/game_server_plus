//핸들러에서 에러가 발생했을경우 서버가 다운되는것을 막기위한 핸들러에러처리

import { createResponse } from "../response/createResponse.js";
import { ErrorCodes } from "./errorCodes.js";

export const handlerError = (socket, error) => {
  let responseCode;
  let message;
  console.error(error, `핸들러 에러임`);
  if (error.code) {
    responseCode = error.code;
    message = error.message;
    console.error(`에러코드:${error.code},메세지:${error.message}`);
  } else {
    responseCode = ErrorCodes.SOCKET_ERROR;
    message = error.message;
    console.error(`일반에러: ${error.message}`);
  }

  const errorResponse = createResponse(-1, responseCode, { message }, null);
  socket.write(errorResponse);
};
