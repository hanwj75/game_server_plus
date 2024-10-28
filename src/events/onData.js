import { config } from "../config/config.js";
import { PACKET_TYPE } from "../constants/header.js";
import { getHandlerById } from "../handlers/index.js";
import { getUserById } from "../session/user.session.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";
import { handlerError } from "../utils/error/errorHandler.js";
import { packetParser } from "../utils/parser/packetParser.js";
export const onData = (socket) => async (data) => {
  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength; //헤더의 전체 길이

  //자기자신 (기존 데이터)과 새로 들어오는 데이터를 계속해서 합쳐주는 작업
  //Buffer.concat([socket.buffer, data])여기서 계속해서 데이터를 받아 socket.buffer 에 쌓아가는 거임
  socket.buffer = Buffer.concat([socket.buffer, data]);

  //무한루프
  //맨처음에 받은 청크 사이즈(socket.buffer.length)가 totalHeaderLength보다 길다면 데이터가 더 온다는 뜻이므로 계속 대기한다.
  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0); //처음에 정의한 메시지의 전체 길이(4byte)
    const packetType = socket.buffer.readUInt8(config.packet.totalLength); //패킷 타임의 길이(1byte)

    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHeaderLength, length); //헤더의 길이에서 메시지의 전체 길이만큼 자른값 = 패킷의 시작지점
      socket.buffer = socket.buffer.subarray(length); //스트림은 연속적인 것 이기 때문에 다음요청에 사용할 패킷이 딸려넘어올수있다. 그러므로 남은 패킷은 length(전체길이)이후부분은 다시 socket.buffer에 넣어준다.
      console.log(`length:${length},packetType:${packetType}`);
      console.log(`packet:${packet}`);

      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            break;
          case PACKET_TYPE.NORMAL:
            const { handlerId, userId, payload, sequence } = packetParser(packet);

            const user = getUserById(userId);
            if (user && user.sequence !== sequence) {
              throw new CustomError(ErrorCodes.INVALID_SEQUENCE, `잘못된 호출값임`);
            }
            const handler = getHandlerById(handlerId);
            await handler({ socket, userId, payload });
        }
      } catch (err) {
        handlerError(socket, err);
      }
    } else {
      //아직 전체 패킷 도착 안한경우
      break;
    }
  }
};
