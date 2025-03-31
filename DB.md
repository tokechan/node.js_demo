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


---
これはリレーションを正しく理解・活用するうえで最高のステップです🙌
早速やっていきましょう！

🎯 目標
GET /api/todos のレスポンスで、
以下のように**user 情報も含めたJSON**を返す！

json
Copy
Edit
[
  {
    "id": 1,
    "title": "Learn coding",
    "completed": false,
    "user": {
      "id": 1,
      "name": "Yuta"
    }
  }
]
✅ ステップ
① User エンティティに @Entity() ついていることを確認
ts
Copy
Edit
// src/models/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Todo } from "./Todo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Todo, todo => todo.user)
  todos!: Todo[];
}
② Todo エンティティ側で @ManyToOne を設定済みであること
ts
Copy
Edit
// src/models/Todo.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: false })
  completed!: boolean;

  @ManyToOne(() => User, user => user.todos)
  user!: User;
}
③ コントローラーで relations: ['user'] を指定する！
ts
Copy
Edit
// src/controllers/todoController.ts
import { AppDataSource } from "../../ormconfig";
import { Todo } from "../models/Todo";
import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todoRepo = AppDataSource.getRepository(Todo);
    const todos = await todoRepo.find({
      relations: ['user']  // ← ここを追加！
    });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching todos", error });
  }
};
④ Postman or curl で確認！
bash
Copy
Edit
curl http://localhost:3000/api/todos
👀 user オブジェクト付きのレスポンスが返ってくれば大成功！



----
いいですね！🙌
共通エラーメッセージを定数として定義しておくと、
✅ メッセージ変更が楽になる
✅ スペルミスが防げる
✅ コードが読みやすくなる
というメリットがあります！

---
✅ Zodでできること（今と対応させてみる）
現在の実装	Zodを使った場合の対応	効果
手動で title や userId を if (!...) でチェック	スキーマ定義で自動バリデーション	バリデーションを型と一緒に管理できる
errorMessages を手動で返す	Zodの safeParse() を使って詳細なエラーを返す	フォーマットされたエラーが取れる
ステータスコードを手動で管理	バリデーションエラーは自動で 400 返す仕組みにもできる	一貫したレスポンス設計が可能
✅ たとえば Zod で POST /api/todos を検証する例
📄 スキーマ定義
ts
Copy
Edit
// src/validations/todoSchema.ts
import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  userId: z.number().int().positive('Valid userId is required'),
});
📄 Controller 側の使い方
ts
Copy
Edit
import { createTodoSchema } from '../validations/todoSchema';

export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createTodoSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { title, userId } = parsed.data;

    // あとは今までと同じ流れで処理
    ...
  } catch (err) {
    next(err);
  }
};
✅ 今の構成にも自然に組み込める！
express-validator より軽くて使いやすい

TypeScriptと相性抜群（型安全・補完が強い）

Controllerの冒頭で safeParse → 不正なら即 400 返す

