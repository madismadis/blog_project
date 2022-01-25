import { createServer } from  'http';
import App from './app';
import { openDatabaseConnection } from './db/db';

// const server = http.createServer((req, res) =>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain');
//     res.end('Hello!');
// });

// let message: String = 'Hello!';


const startServer = async () => {
    const httpServer = createServer(App);
    await openDatabaseConnection();


httpServer.listen(3000,()=>{
    console.log('Server started on http://localhost:3000');
});
};
startServer();
