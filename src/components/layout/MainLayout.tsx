import { ReactNode } from "react";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Household Account Book. All rights reserved.
        </div>
      </footer>
    </div>
  );
}