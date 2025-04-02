# Node.jsのベースイメージ
FROM node:22

# 作業ディレクトリ作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./


# 依存関係をインストール
RUN npm install 

# ソースコードを全てコピー
COPY . .

# ポート番号を公開
EXPOSE 3000

# ts-node-dev を使って開発サーバー起動
CMD ["npm", "run", "dev"]


