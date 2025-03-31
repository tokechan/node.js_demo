🧠 マイグレーション＆シーディングの解説（軽く復習）
🔹 マイグレーションとは？
DBスキーマ（テーブル構造）の履歴をコードで管理できる仕組み
（TypeORMでは typeorm migration:create, migration:run を使う）

今は synchronize: true でアプリ起動時に自動でテーブル作られてるけど、
本番では危険なので migrate で手動管理に切り替えるのが一般的！

🔹 シーディングとは？
DBに 初期データ をプログラムで流し込むこと

たとえば「開発環境では常にサンプルTODO 3件を入れておきたい」といったときに使います。

ts
Copy
Edit
// AppDataSource.initialize() 後などに
await todoRepo.save([
  { title: 'Example 1', completed: false },
  { title: 'Example 2', completed: true },
]);
