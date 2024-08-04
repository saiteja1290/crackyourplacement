import './globals.css'
import { AuthProvider } from './contexts/AuthContext'
import NavBar from './components/NavBar';
// import { FloatingNav } from './components/ui/floating-navbar';
import { ThemeProvider } from './components/theme-provider'
import { GeistSans } from "geist/font/sans";
import Footer from './components/Footer';
export const metadata = {
  title: 'Game Finder',
  description: 'Find and join local games',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>
            <NavBar />
            {children}
            <Footer />

          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}