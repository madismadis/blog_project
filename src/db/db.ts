import { ConnectionOptions, createConnection } from "typeorm";


export async function openDatabaseConnection (){

    const options: ConnectionOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Tere12345',
        database: 'blog'  
    }

    const conn = await createConnection(options);
    if(!conn.isConnected){
        throw new Error ('Connection to database failed');
    }
    return conn;
};