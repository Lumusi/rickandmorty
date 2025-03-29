import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty Explorer",
  description: "Explore the Rick and Morty universe with details on characters, locations, and episodes",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
      },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen flex flex-col bg-background text-foreground",
        inter.className
      )}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="bg-gradient-to-r from-rickMortyRed via-rickBlue to-rickMortyRed text-white mt-12">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-white text-red-glow text-sm font-bold">Rick and Morty Explorer &copy; {new Date().getFullYear()}</p>
                  <p className="text-xs text-white mt-1">Wubba Lubba Dub Dub!</p>
                </div>
                <div className="flex space-x-6">
                  <a href="https://rickandmortyapi.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rickBlue hover:text-glow text-sm">
                    API Documentation
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-rickBlue hover:text-glow text-sm">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </NextThemesProvider>
      </body>
    </html>
  );
}
