import net from "net";
import initServer from "./init/index.js";
import { config } from "./config/config.js";
import { onConnection } from "./events/onConnection.js";

const server = net.createServer(onConnection);
//async키워드가 붙어있으므로 .then사용가능
initServer()
  .then(() => {
    //initServer가 정상적으로 호출되었을 경우에만 서버를 실행시킴
    server.listen(config.server.port, config.server.host, () => {
      console.log(`서버가 port ${config.server.port}:host${config.server.host}에서 실행 중임`);
      console.log(server.address());
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
