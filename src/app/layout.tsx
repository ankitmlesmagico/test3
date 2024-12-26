'use client';
import { Lato } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from '@/components/auth-guard';
import AuthInitializer from '@/components/auth-guard/auth-initializer';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--lato-font',
  display: 'swap',
});

const publicRoutes = ['/login', '/register', '/forgot-password'];
const disableSideBarAndHeader = ['/product-details-page'];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.includes(pathname);
  const isSideBarDisable = !disableSideBarAndHeader.includes(pathname);

  if (isPublicRoute) {
    return (
      <html lang="en">
        <Providers>
          <body className={`${lato.variable}  antialiased`}>
            <AuthInitializer />
            <ToastContainer />
            {children}
          </body>
        </Providers>
      </html>
    );
  }

  return (
    <html lang="en">
      <Providers>
        <body className={`${lato.variable}  antialiased`}>
          <AuthInitializer />
          <ToastContainer />
          <AuthGuard>
            <div className="flex">
              {isSideBarDisable && <Sidebar />}
              <div className="w-full">
                {isSideBarDisable && <Header brandName="Epic Orgnisation" />}
                {children}
              </div>
            </div>
          </AuthGuard>
        </body>
      </Providers>
    </html>
  );
}
