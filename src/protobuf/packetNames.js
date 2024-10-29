export const packetNames = {
  common: {
    Packet: "common.Packet",
    Ping: "common.Ping",
  },
  initial: {
    InitialPacket: "initial.InitialPacket",
  },
  game: {
    CreateGamePayload: "game.CreateGamePayload",
    JoinGamePayload: "game.JoinGamePayload",
    LocationUpdatePayload: "game.LocationUpdatePayload",
  },
  response: {
    Response: "response.Response",
  },
  gameNotification: {
    Start: "gameNotification.Start",
    LocationUpdate: "gameNotification.LocationUpdate",
  },
};

//proto파일을 만들면 여기에 추가해줘야함
