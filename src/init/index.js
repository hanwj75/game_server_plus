import pools from "../db/database.js";
import { testAllConnection } from "../utils/db/testConnection.js";
import { loadGameAssets } from "./assets.js";
import { loadProtos } from "./loadProtos.js";

const initServer = async () => {
  try {
    await loadGameAssets();
    await loadProtos();
    await testAllConnection(pools);
  } catch (err) {
    console.error(err);
    process.exit(1); //loadGameAssets함수안에 로직중에 에러가 발생할경우 프로세스를 종료하도록 하는 명령어
  }
};

export default initServer;
