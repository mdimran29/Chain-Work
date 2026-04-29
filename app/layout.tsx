import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChainWork | Work Without Trust Issues',
  description: 'Decentralized freelancing powered by blockchain escrow.',
  openGraph: {
    title: 'ChainWork | Work Without Trust Issues',
    description: 'Decentralized freelancing powered by blockchain escrow.',
    url: 'https://chainwork.network',
    siteName: 'ChainWork',
    images: [
      {
        url: 'https://chainwork.network/og.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChainWork | Work Without Trust Issues',
    description: 'Decentralized freelancing powered by blockchain escrow.',
    images: ['https://chainwork.network/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Load Material Symbols correctly */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,20..48&display=block"
          rel="stylesheet"
        />
        {/* Load Berkeley Mono for technical data if needed (via Google Fonts fallback if it was hosted, else we use standard mono) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background text-on-surface selection:bg-primary/30 antialiased`}>
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}
