import "../styles/globals.css";
import Header from "../components/header";

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