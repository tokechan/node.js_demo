了解です！以下が、`db.md` にそのまま貼り付けられるマークダウン形式の内容です：

---

```markdown
# 📝 DB & DELETE エンドポイントの問題と学びまとめ（2025-04-01）

## ✅ 概要
Express + TypeORM + MySQL構成で、`DELETE /api/todos/:id` のAPI開発中に直面した問題とその解決方法、および学びの記録。

---

## 🔥 今日ぶち当たった壁 & 解決まとめ

---

### ① DELETE エンドポイントが `500 Internal Server Error`

**問題内容**
- `/api/todos/:id` にDELETEすると、存在するIDでも500エラー
- ログでエラー → `Unknown column 'Todo.dueDate' in 'field list'`

**原因**
- Entityに定義されている `dueDate` がDBに反映されていなかった

**対応**
- Migrationファイルを生成し、DB構造を更新する必要があった

---

### ② マイグレーション生成時の `Cannot find module` エラー

**問題内容**
```bash
Cannot find module '/path/to/project/src/ormconfig.ts'
```

**原因**
- `typeorm` CLIの `-d` で指定したパスが不正
- CLIが `.ts` ファイルを直接読めないため `ts-node` が必要

**解決策**
```bash
npx ts-node ./node_modules/typeorm/cli.js migration:generate -d ormconfig.ts src/migrations/AddDueDateToTodo
```
- `ormconfig.ts` はプロジェクトルートに配置する
- `ts-node` 経由でCLIを叩く

---

### ③ Zodバリデーションが正しく動作しない

**問題内容**
- `DELETE /api/todos/:id` に文字列などを送っても、エラーメッセージが `{}`

**原因**
- `.transform(Number)` を使わず、`id` が string のままだった
- `regex` が `^\d+` で曖昧な形式だった

**修正後のコード**
```ts
export const todoIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, { message: 'Invalid ID format' }).transform(Number),
});
```

---

### ④ TypeScriptの型エラー（RequestHandler）

**問題内容**
```ts
export const deleteTodo: RequestHandler = async (req, res) => { ... }
```
- エラー：型 `Promise<Response>` は `void` と互換性がない

**原因**
- `RequestHandler` は `void` を返す関数を想定

**解決策**
```ts
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => { ... }
```
- `RequestHandler` を使わず、明示的に型を指定

---

### ⑤ マイグレーション時の `getaddrinfo ENOTFOUND db`

**問題内容**
```bash
Error: getaddrinfo ENOTFOUND db
```

**原因**
- `ormconfig.ts` の `host: 'db'` は Docker内専用
- Macローカルからは `localhost` でなければ接続できない

**対応策**
- **推奨**：Dockerコンテナ内でマイグレーション実行
- もしくは `ormconfig.ts` を2パターン用意（ローカル / Docker用）

---

## 📘 学びポイントまとめ

| 学び | 内容 |
|------|------|
| EntityとDBの整合性 | Migrationで正確に反映させる |
| Zodの使い方 | `.regex()` + `.transform(Number)` の組み合わせが重要 |
| TypeScriptの型定義 | `RequestHandler` は `Promise<void>` 不可、直接型指定する |
| CLIコマンド | `ts-node` 経由でCLIを使うことで `.ts` を読み込める |
| Dockerとホスト名 | `db` はDocker内、Macからは `localhost` |

---

## ✅ 最終確認（成功）

- DELETE `/api/todos/:id` → 存在しないID → 404
- DELETE `/api/todos/:id` → 存在するID → 204 or 削除成功

Postman & MySQL両方で確認済 ✅
```
