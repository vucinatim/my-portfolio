import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Nunito, Roboto_Mono } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Tim's Portfolio",
  description: "Check out what I've been up to",
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
      className="overflow-x-hidden scroll-smooth"
      translate="no">
      <body
        className={`${robotoMono.variable} ${nunito.variable} bg-black font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
