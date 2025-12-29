import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          家計簿アプリ
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/transactions">
            <Button variant="ghost">取引一覧</Button>
          </Link>
          <Link href="/categories">
            <Button variant="ghost">カテゴリ管理</Button>
          </Link>
          <Button variant="default">ログイン</Button>
        </nav>
      </div>
    </header>
  );
}