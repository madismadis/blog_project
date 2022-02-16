const config = require("./src/config/config.json");

const tsConfig = {
  type: "mysql",
  entities: [__dirname + "/../entities/*{.ts,.js}"],
  host: config.host,
  port: config.port,
  database: "blog",
  username: config.username,
  password: config.password,
  synchronize: true
}
module.exports = tsConfig;