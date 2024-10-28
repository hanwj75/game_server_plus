import {
  CLIENT_VERSION,
  DB1_HOST,
  DB1_NAME,
  DB1_PASSWORD,
  DB1_PORT,
  DB1_USER,
  DB2_HOST,
  DB2_NAME,
  DB2_PASSWORD,
  DB2_PORT,
  DB2_USER,
  DB3_HOST,
  DB3_NAME,
  DB3_PASSWORD,
  DB3_PORT,
  DB3_USER,
  HOST,
  PORT,
} from "../constants/env.js";
import { PACKET_TYPE_LENGTH, TOTAL_LENGTH } from "../constants/header.js";

export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  client: {
    version: CLIENT_VERSION,
  },
  packet: {
    totalLength: TOTAL_LENGTH,
    typeLength: PACKET_TYPE_LENGTH,
  },
  database: {
    GAME_DB: {
      name: DB1_NAME,
      user: DB1_USER,
      password: DB1_PASSWORD,
      host: DB1_HOST,
      port: DB1_PORT,
    },
    USER_DB: {
      name: DB2_NAME,
      user: DB2_USER,
      password: DB2_PASSWORD,
      host: DB2_HOST,
      port: DB2_PORT,
    },
    LOG_DB: {
      name: DB3_NAME,
      user: DB3_USER,
      password: DB3_PASSWORD,
      host: DB3_HOST,
      port: DB3_PORT,
    },
  },
};
//환경 설정과 관련된 모든것을 사용할때는 config파일에서 호출에서 사용한다.
