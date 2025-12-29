# Household Account Book

シンプルで透明性のある家計簿アプリ。
CI/CDと型安全な開発プロセスを採用し、ポートフォリオとして「開発プロセスの見える化」を重視しています。

---

## 🚀 ステータス

![CI](https://github.com/Ryo-Shigematsu/household-account-book/actions/workflows/ci-cd.yml/badge.svg)

---

## 🛠 技術スタック

### フロントエンド
- **言語**: TypeScript
- **フレームワーク**: Next. js 14 (App Router)
- **UIライブラリ**:  Tailwind CSS v3 + shadcn/ui
- **スタイリング**: CSS Variables, Tailwind Merge, clsx

### バックエンド
- **BaaS**: Supabase (Authentication, PostgreSQL)
- **ORM**: Prisma
- **データベース**: PostgreSQL 15 (Docker)

### 開発ツール
- **Linter**: ESLint (Flat Config, v9対応)
- **Formatter**: Prettier
- **CI/CD**: GitHub Actions
- **バージョン管理**: Git + GitHub

---

## 📘 開発プロセスの特徴

- GitHub Issues を活用してタスクを管理
- CI/CD による自動品質チェック（Lint + 型チェック）
- ESLint v9 の Flat Config に対応済み
- プロセスを透明化し、ポートフォリオとしての説得力を強化

---

## 🏗️ プロジェクト構築履歴

### 初期構築
- **方法**: 手動セットアップ
- **構成**: Next.js 14 + TypeScript + App Router
- **目的**: 学習とポートフォリオのため、必要最小限の構成からスタート

### データベース（PR #20）
- **技術**:  Prisma + PostgreSQL (Docker)
- **環境**:
  - ローカル開発: `hab_dev` @ `localhost:5432`
  - Staging: `hab_staging` @ `localhost:5433`
- **実施内容**:  スキーマ設計、snake_case マイグレーション適用

### UIライブラリ導入（Issue #18, #19, #21）
- **導入日**: 2025-12-26
- **技術**:  Tailwind CSS v3 + shadcn/ui
- **課題**: 手動セットアップのため、依存関係不足が多発
- **解決**: 段階的にパッケージを追加し、依存関係を明確化

#### UIライブラリのセットアップ手順

必要なパッケージの一括インストール：

```powershell
# Tailwind CSS + PostCSS
npm install -D tailwindcss@^3 postcss autoprefixer

# shadcn/ui の依存関係
npm install clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-slot
npm install -D tailwindcss-animate

# TypeScript 型定義
npm install -D @types/node @types/react @types/react-dom
```

shadcn/ui の初期化：

```powershell
# Tailwind CSS 設定ファイル生成
npx tailwindcss init -p

# shadcn/ui 初期化
# ※ フレームワーク検出に失敗する場合は手動設定
# - components. json 作成
# - tailwind.config.ts 更新
# - globals.css にテーマ変数追加
```

### 教訓・改善点

#### ✅ 良かった点
- 依存関係の役割を深く理解できた
- エラー解決を通じて問題解決能力が向上
- 不要なパッケージを避け、最小構成を維持

#### ⚠️ 課題
- エラー駆動開発になり、初期セットアップに時間がかかった
- 依存関係の事前把握が困難

#### 💡 次回への提言
- 新規プロジェクトでは `create-next-app --typescript --tailwind --app` の使用を推奨
- 新しいライブラリ導入時は公式ドキュメントの "Prerequisites" を事前確認
- セットアップ手順を Issue や README に記録し、ナレッジを蓄積

---

## ⚙️ セットアップ方法

```bash
# 依存関係インストール
npm install

# Prisma Client 生成
npx prisma generate

# 開発サーバー起動
npm run dev

# Lint実行
npm run lint

# 型チェック実行
npm run type-check
```

---

## 📚 ドキュメント

- [データベース設計](./docs/database/README.md)
- [ローカル環境セットアップ](./docs/setup/local-setup. md)
- [Staging環境セットアップ](./docs/setup/staging-setup. md)

---

## 🔗 関連リンク

- [GitHub Issues](https://github.com/Ryo-Shigematsu/household-account-book/issues)

---
