🧠 マイグレーション＆シーディングの解説（軽く復習）
🔹 マイグレーションとは？
DBスキーマ（テーブル構造）の履歴をコードで管理できる仕組み
（TypeORMでは typeorm migration:create, migration:run を使う）

今は synchronize: true でアプリ起動時に自動でテーブル作られてるけど、
本番では危険なので migrate で手動管理に切り替えるのが一般的！

✅ 具体的にできることは？
できること	例
カラムを追加	dueDate を Todo に追加 ← 今やったこと！ ✅
カラムを削除	title を削除、dropColumn()
カラム名の変更	name → fullName などにリネーム
テーブルの追加	User テーブルなど新しいエンティティ作成
テーブルの削除	dropTable()
制約・インデックス追加	外部キーやユニーク制約など
✅ メリット
DB構造の履歴をGitで管理できる

チーム開発や本番環境でも同じ構造を再現できる

「何が、いつ、どのように変更されたか」が明確

✅ 実務での運用イメージ
bash
Copy
Edit
# 新しいカラムを追加したい
npx typeorm migration:generate src/migrations/AddSomeField --dataSource=...

# 本番に適用
npx typeorm migration:run --dataSource=...
💡逆に「やっぱりやめたい！」ってなったときは migration:revert でロールバックも可能！




---
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
