import express from 'express';
import router from './routes/index';
import helmet from 'helmet';
import cors from 'cors';

const App = express();
App.use(express.json());
App.use(cors());

App.use(helmet({
  crossOriginResourcePolicy: {
    policy: 'cross-origin',
  }
}));

App.use(router);
App.get('/', (req, res) => {
  res.json({ message: 'Hello!' });
});

export = App;