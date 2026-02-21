import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import PageContainer from '../components/layout/PageContainer'
import { AuthProvider } from '@/lib/hooks/authContext'

export const metadata = {
  title: 'Mauve Step Forum'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"/>
      </head>
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-b from-[#0c091b] to-[#150f27] text-indigo-200 justify-center items-center flex flex-col z-auto">
            {children}
          </div>
        </AuthProvider>
      </body>
      
    </html>
  );
}
