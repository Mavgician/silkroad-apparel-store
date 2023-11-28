'use client'

import styles from '@/app/shopping.module.css'

import { Container } from 'reactstrap'
import { useScreenSize } from '@/app/scripts/custom-hooks'

function ShopHeader({ title, imagesrc, className }) {
  let screenSize = useScreenSize()

  return (
    <Container fluid className={`overflow-hidden py-5 p-0 m-0 ${styles.header} ${className}`}>
      <div className='position-relative'>
        <div className='h-100 w-100 d-flex align-items-center justify-content-center'>
          <p className='text-uppercase position-relative fw-bolder'>{title}</p>
        </div>
        <img className={`${screenSize.height > screenSize.width ? 'h-100' : 'w-100'} top-0 start-0 position-absolute`} src={imagesrc} />
      </div>
    </Container>
  )
}

export { ShopHeader }