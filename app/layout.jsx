import GoogleProvider from '../components/GoogleProvider'
import './globals.css'
import { Ubuntu } from 'next/font/google'
import Navbar from '../components/Navbar'
import MuiThemeProvider from '../components/MuiThemeProvider'

export const ubuntu = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
})

export const metadata = {
  title: 'TubeSync',
  description: 'Generated by create next app',
}



export default function RootLayout({ children }) {

  return (
    <html lang="en" className='bg-white'>



      <body className={ubuntu.className}>
        <Navbar />
        <MuiThemeProvider>
          <GoogleProvider>
            {children}
          </GoogleProvider>
        </MuiThemeProvider>

      </body>
    </html>
  )
}
