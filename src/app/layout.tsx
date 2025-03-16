// src/app/layout.tsx
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Barbers',
  description: 'پیدا کردن بهترین آرایشگران و خدمات زیبایی',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body>
      <div className='flex items-center justify-between bg-yellow-500 text-white px-10 py-5'>
        <div className='flex items-center gap-x-20'>
          <p>خدمات</p>
          <Link href="/barbers">ارایشگران</Link>
         
        </div>

        <p></p>
        <Link href="/" className='font-bold'>Barbers</Link>
      </div>
        
        {children}
        
        </body>
    </html>
  );
}
