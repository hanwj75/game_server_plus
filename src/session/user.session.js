import User from "../classes/models/user.class.js";
import { userSessions } from "./sessions.js";

export const addUser = (socket, uuid) => {
  const user = new User(uuid, socket);
  userSessions.push(user);
  return user;
}; //유저 추가

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
}; //유저 삭제

export const getNextSequence = (id) => {
  const user = getUserById(id);
  if (user) {
    return getNextSequence(); //sequence가 0을 보내줌으로 리턴해주기전에 +1해서 리턴해줘야함
  }
  return null;
};

export const getUserById = (id) => {
  return userSessions.find((user) => {
    user.id === id;
  });
}; //유저 조회
