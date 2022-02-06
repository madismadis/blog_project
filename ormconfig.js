const config = require("./src/config/config.json");

module.exports = {
  type: "mysql",
  entities: [__dirname + "/src/entities/*.ts"],
  host: config.host,
  port: config.port,
  database: "blog",
  username: config.username,
  password: config.password,
  synchronize: true
}