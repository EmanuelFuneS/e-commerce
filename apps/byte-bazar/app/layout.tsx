import { Providers } from "@/components/providers";
import "@workspace/ui/globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
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
        className={`${fontSans.variable} ${fontMono.variable} scroll-smooth font-sans antialiased flex flex-col min-h-screen`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
