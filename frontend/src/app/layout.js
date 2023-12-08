import { Montserrat } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'NGO Platform - Bsystems ',
  description: 'Social and Analytics Platform for Non-Profit Organisations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><StoreProvider>{children}</StoreProvider></body>
    </html>
  )
}
