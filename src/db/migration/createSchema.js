import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pools from "../database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const executeSqlFile = async (pool, filePath) => {
  const sql = fs.readFileSync(filePath, "utf8");
  const queries = sql
    .split(";")
    .map((query) => query.trim())
    .filter((query) => query.length > 0);

  for (const query of queries) {
    await pool.query(query);
  }
};

const createSchemas = async () => {
  const sqlDir = path.join(__dirname, "../sql");
  try {
    //이 아래로 추가
    await executeSqlFile(pools.USER_DB, path.join(sqlDir, "user_db.sql"));
  } catch (err) {
    console.error(err, `데이터베이스 테이블 생성중 오류 발생함`);
  }
};

createSchemas()
  .then(() => {
    console.log(`마이그레이션 완료`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err, `마이그레이션 에러났음!`);
    process.exit(1);
  });
