import { ProductContainer } from '@/app/components/Product'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Loading() {
  return (
    <main>
      <ProductContainer>
        <div>
          <Skeleton height={500} />
        </div>
        <div>
          <Skeleton height={50} />
          <Skeleton height={52} className='my-3 w-50' />
          <Skeleton count={11} />
          <Skeleton height={52} className='mt-5 w-50' />
        </div>
      </ProductContainer>
    </main>
  )
}

export default Loading