了解です！次は **CRUD（Create, Read, Update, Delete）** を順番に実装していきましょう🔥

---

## 🧱 CRUDとは

| 操作       | HTTPメソッド | エンドポイント例       | 意味                    |
|------------|--------------|--------------------------|-------------------------|
| **Create** | POST         | `/api/todos`             | TODOを新規作成する      |
| **Read**   | GET          | `/api/todos`             | TODO一覧を取得する      |
| **Update** | PUT or PATCH | `/api/todos/:id`         | 指定IDのTODOを更新する  |
| **Delete** | DELETE       | `/api/todos/:id`         | 指定IDのTODOを削除する  |

---

今すでに **Read（GET /api/todos）** はできているので、次は **Create（POST）** を一緒にやりましょう！

---

## ✅ ステップ1：POST用のコントローラーを追加

📄 `src/controllers/todoController.ts`

```ts
import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { Todo } from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todoRepo = AppDataSource.getRepository(Todo);
    const todos = await todoRepo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get todos from DB' });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const todoRepo = AppDataSource.getRepository(Todo);

    const newTodo = new Todo();
    newTodo.title = title;
    newTodo.completed = false;

    const saved = await todoRepo.save(newTodo);
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};
```

---

## ✅ ステップ2：ルートにPOSTエンドポイントを追加

📄 `src/routes/todoRoutes.ts`

```ts
import { Router } from 'express';
import { getTodos, createTodo } from '../controllers/todoController';

const router = Router();

router.get('/', getTodos);
router.post('/', createTodo); // ← 追加！

export default router;
```

---

## ✅ ステップ3：動作確認

Dockerを再起動して、Postman または curl でリクエスト！

### 🔧 curlの場合：
このままコピペでよい
正直Postman使う方がわかりやすい
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Docker"}'
```

---

## ✅ 結果（成功時）

```json
{
  "id": 1,
  "title": "Learn Docker",
  "completed": false
}
```

---

Docker環境のMySQLを確認・操作する方法としては、主に以下の2パターンがあります：

✅ ① GUIクライアントを使う（おすすめ✨）
代表的なツール：
ツール名	特徴
TablePlus	Macで人気。見た目がシンプルで高速
DBeaver	クロスプラットフォームで高機能
Sequel Ace	Mac向け（旧 Sequel Pro）
DataGrip	JetBrains製。かなり強力な統合ツール
🔌 接続方法のポイント：
ホスト：localhost

ポート：3306

ユーザー名：root

パスワード：password

DB名：todo_db

ただし注意点！
DockerコンテナがMySQLを持ってるので、GUIクライアントから localhost:3306 に接続できるのは「ポートを公開しているから」。

yaml
Copy
Edit
# docker-compose.yml のここ↓
ports:
  - "3306:3306"
✅ ② phpMyAdminなどの Web 管理ツール
Dockerでサクッと立てるならこれ👇
yaml
Copy
Edit
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    ports:
      - "8080:80"
    environment:
      PMA_HOST: db
    depends_on:
      - db
→ ブラウザでアクセス：
arduino
Copy
Edit
http://localhost:8080
ログイン情報：

ユーザー：root

パスワード：password

ホスト：db

（※ db は docker-compose のサービス名）

✅ 接続できないときのチェックリスト
 docker-compose.yml に 3306:3306 の記述があるか？

 MySQL コンテナが起動しているか？ → docker ps

 Sequel Ace のパスワードに password と入力しているか？

🎉 Sequel Ace でできること
TODOテーブルの中身をGUIで見る

直接データ追加・編集・削除ができる

クエリを手打ちして結果を確認できる

