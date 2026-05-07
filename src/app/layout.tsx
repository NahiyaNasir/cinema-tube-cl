import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "../providers/Query-providers";
import { Toaster } from "sonner";
import { ThemeProvider } from "../providers/theme-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinema Tube",
  description: "      ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"

      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">     <QueryProviders>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Sets background black by default
          enableSystem={false} // Prevents it from switching back to light mode automatically
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
         <Toaster richColors position="top-left" />

      </QueryProviders>
   </body>
    </html>
  );
}
