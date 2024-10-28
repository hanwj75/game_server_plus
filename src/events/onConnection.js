import { onData } from "./onData.js";
import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";

export const onConnection = (socket) => {
  console.log(`Client connected from: ${socket.remoteAddress}:${socket.remotePort}`);

  //각 클라이언트마다 고유한 버퍼를 유지시키기 위해 빈 버퍼 생성
  socket.buffer = Buffer.alloc(0); //빈 버퍼에 받아온 데이터를 쌓아 나가기 위해 선언해 놓은거임

  socket.on("data", onData(socket));

  socket.on("end", onEnd(socket));

  socket.on("error", onError(socket));
};
