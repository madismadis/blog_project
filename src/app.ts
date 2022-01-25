import express from 'express';
import router from './routes/index';
const App = express();
App.use(express.json());

App.use(router);
App.get('/', (req, res) => {
  res.json({ message: 'Hello!' });
});

export = App;