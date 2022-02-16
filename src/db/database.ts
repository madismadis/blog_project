import { createConnection } from 'typeorm';
import path from 'path';
import config from '../config/config.json';
import bunyan, { stdSerializers } from 'bunyan';
import { Stream } from 'stream';
import { serialize } from 'v8';

const stream = new Stream(); 

const logger = bunyan.createLogger({
  name: "database",
  serializers: bunyan.stdSerializers,
  stream: process.stdout
});

export async function openDatabaseConnection() {
  // await closeDatabaseConnection();

  const conn = await createConnection({
    type: "mysql",
    entities: [path.resolve(__dirname, '..', 'entities/*{.ts,.js}')],
    host: config.host,
    port: config.port,
    database: "blog",
    username: config.username,
    password: config.password,
    synchronize: true
  });

  if (!conn.isConnected) {
    throw new Error('Connection to database failed');
  }

  logger.info('Database connected: ', conn.isConnected);
  return conn;
}