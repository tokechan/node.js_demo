//Expressアプリの設定・初期化だけ　純粋にアプリの設定だけ
//app.ts が「Expressアプリの設計図」、index.ts が「その設計図から実行する建築作業」
import express from 'express';
import todoRoutes from './routes/todoRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/todos', todoRoutes);

app.use(errorHandler);//必ずルーティングの後ろに書く

export default app;