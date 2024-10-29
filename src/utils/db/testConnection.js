const testDbConnection = async (pool, dbName) => {
  try {
    const [rows] = await pool.query(`select 1+1 AS solution`);
    console.log(`${dbName}테스트 쿼리 결과 : ${rows[0].solution}`);
  } catch (err) {
    console.error(`${dbName}테스트 쿼리 실행중 오류났단거임 : ${err}`);
  }
};

const testAllConnection = async (pools) => {
  await testDbConnection(pools.GAME_DB, "GAME_DB");
  await testDbConnection(pools.USER_DB, "USER_DB");
  // await testDbConnection(pools.LOG_DB, "LOG_DB");
};

export { testDbConnection, testAllConnection };
