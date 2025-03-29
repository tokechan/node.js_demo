//DB接続してサーバー起動（app.listen()）
//index.ts が「その設計図から実行する建築作業」みたいなもの
import 'reflect-metadata';
import { AppDataSource } from '../ormconfig';
import app from './app';

AppDataSource.initialize().then(() => {
  console.log('✅ Database connected!');
  app.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
})
.catch((error) => {
  console.error('❌ Database connection failed:', error);
});

