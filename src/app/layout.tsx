// app/layout.tsx
import { AppProvider } from "../context/AppContext";
import Navigation from "../components/Navigation";
import './global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AppProvider>
          <Navigation />
          {/* Le "max-w" et "mx-auto" ici règlent ton problème d'affichage collé à gauche */}
          <main className="max-w-7xl mx-auto px-6 py-8">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}