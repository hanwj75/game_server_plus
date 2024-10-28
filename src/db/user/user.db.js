import { toCamelCase } from "../../utils/transformCase.js";
import pools from "../database.js";
import { SQL_QUERIES } from "./user.queries.js";
import { v4 as uuidv4 } from "uuid";

export const findUserByDeviceId = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID);
  return toCamelCase(rows[0]); //여기서 스네이크케이스로 온 값을 카멜케이스로 감싸줌
};

export const createUser = async (deviceId) => {
  const id = uuidv4();
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [id, deviceId]);
  return { id, deviceId };
};

export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};

//강의 3-10 유저 데이터 저장
