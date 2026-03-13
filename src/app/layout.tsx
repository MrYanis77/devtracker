import type { Metadata } from "next";
import { Providers } from "./providers"; // Vérifiez le chemin vers votre fichier Providers
import Navigation from "@/Components/Navigation";
import "./global.css"; // L'import qui posait problème précédemment

export const metadata: Metadata = {
  title: "DevTracker",
  description: "Veille technologique pour développeurs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background antialiased font-sans">
        <Providers>
          <div className="relative flex flex-col h-screen">
            <Navigation />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}