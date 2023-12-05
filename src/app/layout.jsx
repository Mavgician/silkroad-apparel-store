'use client'

import { Navigationbar } from '@/app/components/Navigationbar'
import { PageFooter } from '@/app/components/Footer';

import { usePathname } from 'next/navigation';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/app/globals.css'


function RootLayout({ children }) {
  let path = usePathname().split('/')

  if (path.includes('login') || path.includes('receipt') || path.includes('checkout')) {
    return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    )
  } else {
    return (
      <html lang="en">
        <body>
          <Navigationbar/>
            {children}
          <PageFooter/>
        </body>
      </html>
    )
  }

  
}

/* Wala kayong gagalawin dito pls. Pero libre namang tignan hehe. Want an explanation on this part? Message me - Mavs */

export default RootLayout