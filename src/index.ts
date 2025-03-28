import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from '../ormconfig';
import todoRoutes from './routes/todoRoutes';

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log('📦 DB connected');
        app.listen(3000, () => console.log('📦 Server started on http://localhost:3000'));
    })
    .catch((err) => {
        console.error('🙅‍♀️ Error connection failed:', err);
    });