import { Navigationbar } from '@/app/components/Navigationbar'
import { PageFooter } from '@/app/components/Footer';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/app/globals.css'

export const metadata = {
  title: 'Silkroad Apparel',
  description: 'A mock apparel store developed for Web System and Technologies',
}

function RootLayout({ children }) {
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

/* Wala kayong gagalawin dito pls. Pero libre namang tignan hehe. Want an explanation on this part? Message me - Mavs */

export default RootLayout