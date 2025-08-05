import './globals.css';
import type { Metadata } from 'next';
import { Amiri, Cairo } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
});

const amiri = Amiri({ 
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
});

export const metadata: Metadata = {
  title: 'منصة التعلم الإسلامي - التعليم الإسلامي المتقدم',
  description: 'منصة شاملة للتعلم الإسلامي تتضمن مكتبة الأحاديث وأحكام الفقه وتتبع التقدم الشخصي.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${amiri.variable}`}>
      <body className={cairo.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}