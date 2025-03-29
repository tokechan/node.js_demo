//Expressアプリの設定・初期化だけ
import express from 'express';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(express.json());
app.use('/api/todos', todoRoutes);

export default app;