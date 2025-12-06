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
npm install
npm run dev
npm run lint
npm run type-check
```

## ER図 — Transactions / Categories / Users (MVP)

```mermaid
erDiagram
  USERS {
    UUID id PK
    VARCHAR email UNIQUE
    VARCHAR name
  }

  CATEGORIES {
    UUID id PK
    UUID user_id FK
    VARCHAR name
    VARCHAR type
    VARCHAR color
    VARCHAR icon
    TIMESTAMP created_at
    TIMESTAMP updated_at
  }

  TRANSACTIONS {
    UUID id PK
    UUID user_id FK
    NUMERIC amount
    UUID category_id FK
    DATE date
    TEXT note
    TIMESTAMP created_at
    TIMESTAMP updated_at
    VARCHAR type
    VARCHAR currency
  }

  USERS ||--o{ TRANSACTIONS : "has"
  USERS ||--o{ CATEGORIES : "owns"
  CATEGORIES ||--o{ TRANSACTIONS : "categorizes"
```

### 注意点

- Mermaid の `erDiagram` ブロック内にコメントや引用符で囲んだ注釈を入れるとパーサエラーになります。注釈はブロック外に記載しています。
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

## ER図 — Transactions / Categories / Users (MVP)

```mermaid
erDiagram
	USERS {
		UUID id PK
		VARCHAR email UNIQUE
		VARCHAR name
	}

	CATEGORIES {
		UUID id PK
		UUID user_id FK
		VARCHAR name
		VARCHAR type
		VARCHAR color
		VARCHAR icon
		TIMESTAMP created_at
		TIMESTAMP updated_at
	}

	TRANSACTIONS {
		UUID id PK
		UUID user_id FK
		NUMERIC amount
		UUID category_id FK
		DATE date
		TEXT note
		TIMESTAMP created_at
		TIMESTAMP updated_at
		VARCHAR type
		VARCHAR currency
	}

	USERS ||--o{ TRANSACTIONS : "has"
	USERS ||--o{ CATEGORIES : "owns"
	CATEGORIES ||--o{ TRANSACTIONS : "categorizes"
```
### FK / 制約・運用の提案

- `users.email` は Auth と同期し、`UNIQUE` にする。
- `categories.user_id` は `NOT NULL` にしてユーザーごとのカテゴリ分離を保証する（共有カテゴリが要る場合は別テーブルで対応）。
- `transactions.user_id` は `NOT NULL`（全取引はユーザーに紐づく想定）。
- カテゴリ削除時の挙動:
  - オプション A: `RESTRICT`（削除不可） — 誤削除を防ぐ。
  - オプション B: `SET NULL`（`transactions.category_id` を `NULL` にする） — カテゴリ任意化が必要な場合。
- `users` → `categories`, `transactions` の `ON DELETE` は `RESTRICT` を推奨（誤ってユーザー削除で全データ消したくない場合）。

### インデックス推奨

- `transactions(user_id)`
- `transactions(date)`
- `transactions(category_id)`
- `categories(user_id)`
- `users(email)` `UNIQUE`

### 備考

- 振替（Transfer）は設計によっては別テーブル（transfer テーブル with from_tx / to_tx）や、関連する 2 レコードで表現する方法がある。MVP であれば `type` ENUM による管理で十分。
- 多通貨対応を本格化する場合は `currency` と為替レート履歴の設計を追加することを検討してください。
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

## ER図 — Transactions / Categories / Users (MVP)

```mermaid
erDiagram
	USERS {
		UUID id PK
		VARCHAR email UNIQUE
		VARCHAR name
	}

	CATEGORIES {
		UUID id PK
		UUID user_id FK
		VARCHAR name
		VARCHAR type
		VARCHAR color
		VARCHAR icon
		TIMESTAMP created_at
		TIMESTAMP updated_at
	}

	TRANSACTIONS {
		UUID id PK
		UUID user_id FK
		NUMERIC amount
		UUID category_id FK
		DATE date
		TEXT note
		TIMESTAMP created_at
		TIMESTAMP updated_at
		VARCHAR type
		VARCHAR currency
	}

	USERS ||--o{ TRANSACTIONS : "has"
	USERS ||--o{ CATEGORIES : "owns"
	CATEGORIES ||--o{ TRANSACTIONS : "categorizes"
```

### テーブル定義（要点）

- **Users**
  - `id`: UUID (PK) — Supabase Auth の user id に合わせる
  - `email`: VARCHAR — 一意制約 (unique)
  - `name`: VARCHAR — 表示名

- **Categories**
  - `id`: UUID (PK)
  - `user_id`: UUID (FK → users.id) — ユーザーごとのカテゴリ分離
  - `name`: VARCHAR
  - `type`: ENUM('income','expense') — カテゴリ種別（任意）
  - `color`: VARCHAR — UI 用カラーコード
  - `icon`: VARCHAR — アイコン識別子
  - `created_at`, `updated_at`: TIMESTAMP（`created_at` default `now`）

- **Transactions**
  - `id`: UUID (PK)
  - `user_id`: UUID (FK → users.id) — 所有者（必須）
  - `amount`: NUMERIC — 金額
  - `category_id`: UUID (FK → categories.id) — カテゴリ（任意にすることも可）
  - `date`: DATE / TIMESTAMP — 取引日
  - `note`: TEXT — 任意メモ
  - `created_at`, `updated_at`: TIMESTAMP（`created_at` default `now`）
  - `type`: ENUM('income','expense','transfer') — 取引タイプ
  - `currency`: VARCHAR — 通貨コード（任意）

### FK / 制約・運用の提案

- `users.email` は Auth と同期し、`UNIQUE` にする。
- `categories.user_id` は `NOT NULL` にしてユーザーごとのカテゴリ分離を保証する（共有カテゴリが要る場合は別テーブルで対応）。
- `transactions.user_id` は `NOT NULL`（全取引はユーザーに紐づく想定）。
- カテゴリ削除時の挙動:
  - オプション A: `RESTRICT`（削除不可） — 誤削除を防ぐ。
  - オプション B: `SET NULL`（`transactions.category_id` を `NULL` にする） — カテゴリ任意化が必要な場合。
- `users` → `categories`, `transactions` の `ON DELETE` は `RESTRICT` を推奨（誤ってユーザー削除で全データ消したくない場合）。

### インデックス推奨

- `transactions(user_id)`
- `transactions(date)`
- `transactions(category_id)`
- `categories(user_id)`
- `users(email)` `UNIQUE`

### 備考

- 振替（Transfer）は設計によっては別テーブル（transfer テーブル with from_tx / to_tx）や、関連する 2 レコードで表現する方法がある。MVP であれば `type` ENUM による管理で十分。
- 多通貨対応を本格化する場合は `currency` と為替レート履歴の設計を追加することを検討してください。
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
# Household Account Book

シンプルで透明性のある家計簿アプリ。
CI/CDと型安全な開発プロセスを採用し、ポートフォリオとしての"開発プロセスの見える化"を重視しています。

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

## ER図 — Transactions / Categories / Users (MVP)

```mermaid
erDiagram
	USERS {
		UUID id PK
		VARCHAR email UNIQUE
		VARCHAR name
	}

	CATEGORIES {
		UUID id PK
		UUID user_id FK
		VARCHAR name
		VARCHAR type
		VARCHAR color
		VARCHAR icon
		TIMESTAMP created_at
		TIMESTAMP updated_at
	}

	TRANSACTIONS {
		UUID id PK
		UUID user_id FK
		NUMERIC amount
		UUID category_id FK
		DATE date
		TEXT note
		TIMESTAMP created_at
		TIMESTAMP updated_at
		VARCHAR type
		VARCHAR currency
	}

	USERS ||--o{ TRANSACTIONS : "has"
	USERS ||--o{ CATEGORIES : "owns"
	CATEGORIES ||--o{ TRANSACTIONS : "categorizes"
```

### テーブル定義（要点）

- **Users**
  - `id`: UUID (PK) — Supabase Auth の user id に合わせる
  - `email`: VARCHAR — 一意制約 (unique)
  - `name`: VARCHAR — 表示名

- **Categories**
  - `id`: UUID (PK)
  - `user_id`: UUID (FK → users.id) — ユーザーごとのカテゴリ分離
  - `name`: VARCHAR
  - `type`: ENUM('income','expense') — カテゴリ種別（任意）
  - `color`: VARCHAR — UI 用カラーコード
  - `icon`: VARCHAR — アイコン識別子
  - `created_at`, `updated_at`: TIMESTAMP（`created_at` default `now`）

- **Transactions**
  - `id`: UUID (PK)
  - `user_id`: UUID (FK → users.id) — 所有者（必須）
  - `amount`: NUMERIC — 金額
  - `category_id`: UUID (FK → categories.id) — カテゴリ（任意にすることも可）
  - `date`: DATE / TIMESTAMP — 取引日
  - `note`: TEXT — 任意メモ
  - `created_at`, `updated_at`: TIMESTAMP（`created_at` default `now`）
  - `type`: ENUM('income','expense','transfer') — 取引タイプ
  - `currency`: VARCHAR — 通貨コード（任意）

### FK / 制約・運用の提案

-- `users.email` は Auth と同期し、`UNIQUE` にする。
-- `categories.user_id` は `NOT NULL` にしてユーザーごとのカテゴリ分離を保証する（共有カテゴリが要る場合は別テーブルで対応）。
-- `transactions.user_id` は `NOT NULL`（全取引はユーザーに紐づく想定）。
-- カテゴリ削除時の挙動:
  - オプション A: `RESTRICT`（削除不可） — 誤削除を防ぐ。
  - オプション B: `SET NULL`（`transactions.category_id` を `NULL` にする） — カテゴリ任意化が必要な場合。
-- `users` → `categories`, `transactions` の `ON DELETE` は `RESTRICT` を推奨（誤ってユーザー削除で全データ消したくない場合）。

### インデックス推奨

- `transactions(user_id)`
- `transactions(date)`
- `transactions(category_id)`
- `categories(user_id)`
- `users(email)` `UNIQUE`

### 備考

- 振替（Transfer）は設計によっては別テーブル（transfer テーブル with from_tx / to_tx）や、関連する 2 レコードで表現する方法がある。MVP であれば `type` ENUM による管理で十分。
- 多通貨対応を本格化する場合は `currency` と為替レート履歴の設計を追加することを検討してください。
