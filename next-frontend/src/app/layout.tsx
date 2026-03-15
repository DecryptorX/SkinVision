import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkinVision AI',
  description: 'AI Powered Skin Condition Detection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030303] text-white antialiased min-h-screen flex flex-col selection:bg-indigo-500/30`}>
        <Navbar />
        <main className="flex-1 w-full flex flex-col pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
