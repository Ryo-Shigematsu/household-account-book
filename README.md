# Household Account Book

シンプルで透明性のある家計簿アプリ。
CI/CDと型安全な開発プロセスを採用し、ポートフォリオとして「開発プロセスの見える化」を重視しています。

---

## 🚀 ステータス

![CI](https://github.com/Ryo-Shigematsu/household-account-book/actions/workflows/ci-cd.yml/badge.svg)

---

## 🛠 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js
- **バックエンド**: Supabase
- **ツール**: ESLint (Flat Config, v9対応), Prettier
- **CI/CD**: GitHub Actions

---

## 📘 開発プロセスの特徴

- GitHub Issues を活用してタスクを管理
- CI/CD による自動品質チェック（Lint + 型チェック）
- ESLint v9 の Flat Config に対応済み
- プロセスを透明化し、ポートフォリオとしての説得力を強化

---

## ⚙️ セットアップ方法

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# Lint実行
npm run lint

# 型チェック実行
npm run type-check
```