import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヒーローセクション */}
        <section className="text-center space-y-4 py-12">
          <h1 className="text-4xl font-bold tracking-tight">
            シンプルで透明性のある家計簿
          </h1>
          <p className="text-xl text-muted-foreground">
            収支を記録し、カテゴリ別に分析。家計の見える化を実現します。
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/transactions">
              <Button size="lg">今すぐ始める</Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">詳しく見る</Button>
            </Link>
          </div>
        </section>

        {/* 機能紹介 */}
        <section className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>📝 簡単記録</CardTitle>
              <CardDescription>
                収入・支出を数クリックで記録
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                日付、金額、カテゴリを選択するだけ。シンプルな操作で素早く記録できます。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 カテゴリ分析</CardTitle>
              <CardDescription>
                支出をカテゴリ別に可視化
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                食費、交通費、娯楽費など、カテゴリごとに支出を集計。無駄遣いを発見できます。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔒 安全管理</CardTitle>
              <CardDescription>
                データは安全に保管
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Supabaseによる安全な認証とデータ管理。あなたのデータは厳重に保護されます。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center py-12">
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">早速使ってみましょう</CardTitle>
              <CardDescription>
                アカウント作成は無料。今すぐ家計管理を始められます。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/transactions">
                <Button size="lg" className="w-full md:w-auto">
                  取引を記録する
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
}