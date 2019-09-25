const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const users = data.users;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  const firstUser = await users.addUser(
    "mf1234", "hidden", "mfang@google.com");

  const secondUser = await users.addUser(
    "tf2149", "hidden", "tfang@google.com");

  const thirdUser = await users.addUser(
    "cc9999", "hidden", "chang@yahoo.com");

  console.log("Done seeding database");
  
  const getAlls = await users.getAllUsers();
  console.log("Log all the tasks so far ===>");
  console.log(getAlls);

  await db.serverConfig.close();
};

main().catch(console.log);

