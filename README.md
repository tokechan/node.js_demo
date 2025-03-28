# node.js_demo

もちろんできます！  
「できる限り自分で解決・考える」を前提として、**手順の流れ（やること）＋ヒントや考え方の道しるべ**だけを提示するスタイルで進めましょう。

---

## ✅ 基本構築フェーズのアウトプット手順

以下は、**最小構成の TODO API（認証なし）を TypeScript + Docker 環境で作る流れ**です。

---
📁 プロジェクト構成（TypeORM対応版）

```
todo-api-ts/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── tsconfig.json
├── ormconfig.ts                # TypeORM の設定ファイル
└── src/
    ├── index.ts                # アプリのエントリーポイント
    ├── controllers/
    │   └── todoController.ts
    ├── services/
    │   └── todoService.ts
    ├── models/
    │   └── Todo.ts             # TypeORM のエンティティ
    ├── routes/
    │   └── todoRoutes.ts
    └── utils/
        └── errorHandler.ts
```

---
# 📁 todo-api-ts/

- `Dockerfile` - Node.jsアプリ用Docker設定ファイル
- `docker-compose.yml` - アプリ＆MySQL用のDocker Compose定義
- `.dockerignore` - Dockerビルド時に無視するファイル設定
- `package.json` - npmパッケージ定義＆スクリプト
- `tsconfig.json` - TypeScriptの設定ファイル
- `ormconfig.ts` - TypeORMのDB接続設定

## 📁 src/

- `index.ts` - アプリのエントリーポイント（Expressサーバー起動）

### 📁 controllers/
- `todoController.ts` - ルーティングから呼ばれるロジックを定義

### 📁 services/
- `todoService.ts` - DB操作などのビジネスロジックを実装

### 📁 models/
- `Todo.ts` - TypeORMのエンティティ（DBテーブルに対応）

### 📁 routes/
- `todoRoutes.ts` - `/api/todos` のルーティング設定

### 📁 utils/
- `errorHandler.ts` - 共通のエラーハンドリング処理




---

### 🛠 Step 1：プロジェクト構成と TypeScript 導入

| やること                                    | ヒント・補足                                                                      |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| 1. プロジェクトフォルダを作成               | `mkdir todo-api-ts && cd todo-api-ts`                                             |
| 2. TypeScript プロジェクト初期化            | `npm init -y` → `npm install typescript --save-dev`<br>`npx tsc --init`           |
| 3. `strict: true` にする                    | `tsconfig.json` を開いて `strict: true` に変更                                    |
| 4. 必要なディレクトリ構成を決める           | 例：`src/`, `src/controllers`, `src/services`, `src/models` など。自由に考えて OK |
| 5. Express と型関連ライブラリをインストール | `npm install express`<br>`npm install @types/express --save-dev`                  |

> ✅ 自分で考えるポイント：構成をどう分けるか？ ファイル名・責務の分け方を意識してみよう。

---

### 🐳 Step 2：Docker 環境構築

| やること                                                  | ヒント・補足                               |
| --------------------------------------------------------- | ------------------------------------------ |
| 1. `Dockerfile` を作成                                    | ベースは `node:18-alpine` などがおすすめ   |
| 2. `docker-compose.yml` を作成                            | サービスは `app`, `db`（MySQL など）を用意 |
| 3. `.dockerignore` を作成                                 | `node_modules`, `dist`, `.env` など除外    |
| 4. コンテナ内で TypeScript をビルド・実行できるように設定 | `tsc` → `node dist/index.js`               |

> ✅ 自分で考えるポイント：ビルドと実行の流れ、どこでやるか（ローカルか Docker 内か）

---

### 🧬 Step 3：DB と ORM の導入（TypeORM or Prisma）

| やること                          | ヒント・補足                                            |
| --------------------------------- | ------------------------------------------------------- |
| 1. ORM のどちらかを選定           | Prisma はドキュメントが親切、TypeORM はより自由度が高い |
| 2. インストールして DB 接続設定   | DB は MySQL（Docker で立てる）                          |
| 3. マイグレーションでテーブル作成 | `User`, `Todo` など作ってみよう                         |
| 4. シーディングの方法を試す       | テスト用の初期データを流してみる                        |

> ✅ 自分で考えるポイント：ER 設計、どんなフィールドが必要か？

---

### 🔄 Step 4：API の構築（CRUD）

| やること                               | ヒント・補足                              |
| -------------------------------------- | ----------------------------------------- |
| 1. ルーティングを設計                  | `/api/todos` などを設計                   |
| 2. 各 CRUD の Controller・Service 作成 | GET, POST, PUT, DELETE を 1 つずつ実装    |
| 3. モデルとのやり取りを実装            | Prisma なら `prisma.todo.findMany()` など |
| 4. Postman で確認                      | Body に JSON を入れて POST してみよう     |

> ✅ 自分で考えるポイント：Controller と Service の責務分離、バリデーションの扱い

---

### ⚠️ Step 5：エラーハンドリング・例外処理

| やること                              | ヒント・補足                               |
| ------------------------------------- | ------------------------------------------ |
| 1. `try-catch` を導入                 | DB 操作や Service 層で発生しうる例外を捕捉 |
| 2. ステータスコードに応じたレスポンス | 例：400, 404, 500 などを適切に返す         |

> ✅ 自分で考えるポイント：どこでエラーをキャッチすべきか？

---

### ✅ 完了条件のチェックリスト

- [ ] TypeScript で Express サーバーを立ち上げられている
- [ ] Docker でアプリと DB が起動する
- [ ] TODO リストの CRUD API が動作する
- [ ] ORM を使った DB 操作ができている
- [ ] Postman でリクエストを確認できる
- [ ] 例外処理が最低限できている

---

この流れに沿って、**できる限り「なぜそれをするか」を考えながら**手を動かしてみてください。  
もし詰まったり、考え方の方向性を確認したくなったら「ここまでやってみたけどこれでいい？」とか「この設定ってなんのためにあるの？」と気軽に聞いてください！

次に取り掛かりたいステップが決まったら、それを元に「次やること」をピンポイントで示すこともできますよ。
