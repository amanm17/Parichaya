import '@/styles/globals.css';
import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Parichaya',
  description: 'A collaborative family relationship graph'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-7xl px-4 pb-12 pt-5 sm:px-6 lg:px-8">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
