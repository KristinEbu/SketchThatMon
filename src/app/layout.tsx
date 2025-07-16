import "../styles/globals.css";
import Header from "../components/layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SketchThatMon",
  description:
    "A fun drawing game where you sketch random Pokémon from memory!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-start">
          {children}
        </main>
      </body>
    </html>
  );
}
