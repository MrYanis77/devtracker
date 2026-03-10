// app/layout.tsx
import { Providers } from "./providers"; // On importe le "pack" de providers
import Navigation from "../components/Navigation";
import './global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers> {/* Un seul composant qui contient tout ! */}
          <Navigation />
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}