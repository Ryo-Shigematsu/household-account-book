# データベースセットアップガイド

このプロジェクトでは、Supabase (PostgreSQL) をデータベースとして使用し、Prisma を ORM として利用します。

## 📋 目次

- [前提条件](#前提条件)
- [環境変数の設定](#環境変数の設定)
- [ローカル開発環境でのマイグレーション](#ローカル開発環境でのマイグレーション)
- [Supabase へのマイグレーション適用](#supabase-へのマイグレーション適用)
- [Shadow Database について](#shadow-database-について)
- [トラブルシューティング](#トラブルシューティング)
- [スキーマ設計に関する注意事項](#スキーマ設計に関する注意事項)

---

## 前提条件

以下のツールがインストールされている必要があります：

- **Node.js** (v18 以上推奨)
- **npm** (Node.js に付属)
- **Prisma CLI** (`npm install` で自動的にインストールされます)
- **Supabase アカウント** (本番環境用)

必要な依存関係をインストール：

```bash
npm install
```

これにより、`prisma` と `@prisma/client` が自動的にインストールされます。

---

## 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定します。

`.env.example` をコピーして `.env` を作成：

```bash
cp .env.example .env
```

### DATABASE_URL

プライマリデータベースへの接続文字列。

**ローカル開発の例**：
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/household_account_book"
```

**Supabase の例**：
```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

Supabase の接続文字列は、Supabase Dashboard の **Settings > Database > Connection string** から取得できます。

### SHADOW_DATABASE_URL

Prisma のマイグレーション機能が使用する一時的なデータベース。

**重要**: Supabase に直接マイグレーションを実行する場合、Shadow Database の設定が必要です。

**オプション 1: ローカルの PostgreSQL を使用**
```
SHADOW_DATABASE_URL="postgresql://postgres:password@localhost:5432/household_account_book_shadow"
```

**オプション 2: 別の Supabase プロジェクトを使用**
```
SHADOW_DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[SHADOW-PROJECT-REF].supabase.co:5432/postgres"
```

---

## ローカル開発環境でのマイグレーション

### 初期マイグレーションの作成と適用

プロジェクトに含まれる `prisma/schema.prisma` から初期マイグレーションを作成します：

```bash
npx prisma migrate dev --name init --schema=prisma/schema.prisma
```

または、package.json に定義されたスクリプトを使用：

```bash
npm run prisma:migrate
```

このコマンドは以下を実行します：
1. マイグレーションファイルを `prisma/migrations/` ディレクトリに生成
2. データベースにマイグレーションを適用
3. Prisma Client を自動生成

### Prisma Client の生成

マイグレーション後、または schema.prisma を更新した後は、Prisma Client を再生成します：

```bash
npm run prisma:generate
```

または：

```bash
npx prisma generate
```

### マイグレーションの確認

データベースの状態を確認：

```bash
npx prisma migrate status
```

Prisma Studio でデータを確認：

```bash
npx prisma studio
```

---

## Supabase へのマイグレーション適用

Supabase の本番環境にマイグレーションを適用する際は、以下の方法を推奨します。

### 方法 1: SQL ファイルを手動で適用（推奨）

**ステップ 1**: ローカルでマイグレーションを生成

```bash
npx prisma migrate dev --name <migration_name>
```

**ステップ 2**: 生成された SQL ファイルを確認

マイグレーションファイルは `prisma/migrations/<timestamp>_<migration_name>/migration.sql` に生成されます。

**ステップ 3**: Supabase Dashboard で SQL を実行

1. Supabase Dashboard にログイン
2. **SQL Editor** を開く
3. 生成された `migration.sql` の内容をコピー＆ペースト
4. **Run** をクリックして実行

この方法は、マイグレーションを本番環境に適用する前に確認できるため、最も安全です。

### 方法 2: prisma migrate deploy を使用

**注意**: この方法では Shadow Database が不要ですが、本番環境の DATABASE_URL を直接指定する必要があります。

```bash
# .env に本番環境の DATABASE_URL を設定してから実行
npx prisma migrate deploy
```

`prisma migrate deploy` は既存のマイグレーションファイルを本番環境に適用します。開発用の `migrate dev` とは異なり、新しいマイグレーションを生成しません。

### 方法 3: CI/CD パイプラインで自動化

GitHub Actions などの CI/CD パイプラインを使用して、自動的にマイグレーションを適用することも可能です：

```yaml
# .github/workflows/deploy.yml の例
- name: Run Prisma Migrations
  run: npx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## Shadow Database について

### Shadow Database とは？

Shadow Database は、Prisma が開発時に使用する一時的なデータベースです。マイグレーションの整合性を確認し、既存のデータベース状態と新しいスキーマを比較するために使用されます。

### なぜ必要なのか？

`prisma migrate dev` コマンドは、以下の目的で Shadow Database を使用します：

1. **マイグレーションの検証**: 新しいマイグレーションが正しく適用できるか確認
2. **スキーマのドリフト検出**: 現在のデータベース状態とマイグレーション履歴の差分を検出
3. **安全なリセット**: データベースを再作成する際の一時的な領域として使用

### Supabase での Shadow Database 対応

Supabase では、デフォルトで Shadow Database を作成する権限がないため、以下のいずれかの方法で対応します：

**オプション 1: ローカル PostgreSQL を使用（推奨）**

開発時はローカルの PostgreSQL を使用し、本番環境は Supabase を使用：

```bash
# .env (開発用)
DATABASE_URL="postgresql://postgres:password@localhost:5432/household_account_book"
SHADOW_DATABASE_URL="postgresql://postgres:password@localhost:5432/household_account_book_shadow"
```

**オプション 2: 別の Supabase プロジェクトを Shadow Database として使用**

開発用の Supabase プロジェクトを別に作成し、Shadow Database として使用：

```bash
# .env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[MAIN-PROJECT].supabase.co:5432/postgres"
SHADOW_DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[SHADOW-PROJECT].supabase.co:5432/postgres"
```

**オプション 3: マイグレーションを手動で管理**

Shadow Database を使用せず、生成された SQL ファイルを手動で Supabase に適用する方法（前述の「方法 1」を参照）。

---

## トラブルシューティング

### エラー: "Cannot find module '@prisma/client'"

Prisma Client が生成されていない可能性があります。

**解決方法**:
```bash
npm run prisma:generate
```

### エラー: "Shadow database cannot be created"

Shadow Database の設定が正しくないか、権限がない可能性があります。

**解決方法**:
1. `.env` ファイルに `SHADOW_DATABASE_URL` が設定されているか確認
2. Shadow Database 用のデータベースが存在するか確認
3. ローカル開発では、手動で Shadow Database を作成：
   ```sql
   CREATE DATABASE household_account_book_shadow;
   ```

### エラー: "Migration failed to apply"

既存のデータベースとの競合や、不正な SQL が原因の可能性があります。

**解決方法**:
1. データベースの現在の状態を確認：
   ```bash
   npx prisma migrate status
   ```
2. 必要に応じてマイグレーション履歴をリセット（開発環境のみ）：
   ```bash
   npx prisma migrate reset
   ```

### Supabase で接続エラーが発生する

**解決方法**:
1. Supabase の接続文字列が正しいか確認
2. IP アドレスがホワイトリストに登録されているか確認（Supabase Dashboard > Settings > Database > Network restrictions）
3. SSL 接続が必要な場合は、接続文字列に `?sslmode=require` を追加

---

## 参考リンク

- [Prisma 公式ドキュメント](https://www.prisma.io/docs)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Supabase 公式ドキュメント](https://supabase.com/docs)
- [Supabase と Prisma の統合ガイド](https://supabase.com/docs/guides/integrations/prisma)

---

## スキーマ設計に関する注意事項

### 金額フィールド (amount) について

現在のスキーマでは、Transaction モデルの `amount` フィールドに `Int` 型を使用しています。これは整数値（例：円単位）で金額を扱うことを想定した設計です。

```prisma
amount       Int
```

**この設計の特徴**:
- ✅ シンプルで高速な計算
- ✅ 円単位など、小数点以下が不要な通貨に最適
- ⚠️ 小数点以下の精度が必要な場合（例：為替計算、税率計算）は考慮が必要

**将来的に小数点精度が必要になった場合**、以下のように Decimal 型に変更することを検討してください：

```prisma
amount       Decimal       @db.Decimal(10,2)
```

### npm スクリプトについて

package.json の `prisma:migrate` スクリプトは初期マイグレーション用に設計されています：

```json
"prisma:migrate": "prisma migrate dev --name init"
```

**使用方法**:
- 初回のマイグレーション: `npm run prisma:migrate`
- 2回目以降のマイグレーション: `npx prisma migrate dev --name <descriptive_name>`

初回以降は、変更内容を説明する適切な名前を指定してマイグレーションを作成してください。

---

## まとめ

このガイドに従って、Prisma と Supabase を使用したデータベースのセットアップとマイグレーションを安全に行うことができます。

**推奨ワークフロー**:
1. ローカル環境で `prisma migrate dev` を使用してマイグレーションを開発
2. 生成された SQL ファイルを確認
3. Supabase Dashboard で手動で SQL を実行、または `prisma migrate deploy` を使用

問題が発生した場合は、トラブルシューティングセクションを参照してください。
