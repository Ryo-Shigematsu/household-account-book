import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "家計簿アプリ - Household Account Book",
  description: "シンプルで透明性のある家計簿アプリ。収支を記録し、カテゴリ別に分析。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
