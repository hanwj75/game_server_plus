import { config } from "../../config/config.js";
import { getProtoTypeNameByHandlerId } from "../../handlers/index.js";
import { getProtoMessages } from "../../init/loadProtos.js";
import CustomError from "../error/customError.js";
import { ErrorCodes } from "../error/errorCodes.js";

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  //공통 패킷 구조 디코딩
  const Packet = protoMessages.common.Packet; //공통패킷의 이름
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (err) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, `패킷디코딩 오류임`);
  }

  const handlerId = packet.handlerId;
  // console.log("🚀 ~ file: packetParser.js:16 ~ packetParser ~ handlerId:", handlerId);
  const userId = packet.userId;
  // console.log("🚀 ~ file: packetParser.js:17 ~ packetParser ~ userId:", userId);
  const clientVersion = packet.clientVersion;
  // console.log("🚀 ~ file: packetParser.js:18 ~ packetParser ~ clientVersion:", clientVersion);

  const sequence = packet.sequence;
  // console.log("🚀 ~ file: packetParser.js:21 ~ packetParser ~ sequence:", sequence);

  if (clientVersion !== config.client.version) {
    throw new CustomError(ErrorCodes.CLIENT_VERSION_MISMATCH, `클라버전에러임`);
  }
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, `알수없는 핸들러ID : ${handlerId}`);
  }

  const [namespace, typeName] = protoTypeName.split("."); //handlers/index.js 에 있는 initial.InitialPacket 을 .을 기준으로 나눈거임
  const PayloacType = protoMessages[namespace][typeName];
  let payload;

  try {
    payload = PayloacType.decode(packet.payload);
  } catch (err) {
    throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR, `패킷디코딩 오류임`);
  }

  const errorMessage = PayloacType.verify(payload);
  if (errorMessage) {
    throw new CustomError(ErrorCodes.INVALID_PACKET, `패킷 구조 이상함${errorMessage}`);
  }

  //필드가 비어있는 경우 = 필수 필드가 누락된 경우
  const expectedFields = Object.keys(PayloacType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => {
    !actualFields.includes(field);
  });
  if (missingFields.length > 0) {
    throw new CustomError(ErrorCodes.MISSING_FIELDS, `필수 필드 누락 ${missingFields.join(",")}`);
  }

  return { handlerId, userId, payload, sequence };
};
