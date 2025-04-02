import { AppDataSource } from "../../ormconfig";

const runMigrations = async () => {
  try {
    console.log("🚀 データベース接続中...");
    await AppDataSource.initialize();

    console.log("✅ マイグレーションを実行中...");
    await AppDataSource.runMigrations();

    console.log("🔌 接続を終了します...");
    await AppDataSource.destroy();

    console.log("🎉 マイグレーション完了！");
    process.exit(0);
  } catch (error) {
    console.error("❌ エラー:", error);
    process.exit(1);
  }
};

runMigrations();
