import { Providers } from "@/components/providers";
import "@workspace/ui/globals.css";
import { Exo_2, Geist, Geist_Mono } from "next/font/google";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontExo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="">
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontExo2.variable} scroll-smooth font-sans antialiased flex flex-col min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
