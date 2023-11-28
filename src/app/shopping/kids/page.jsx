'use client'

import { ShopHeader } from "@/app/components/ShopHeader"
import { Product, ProductCollection } from "@/app/components/Product"

function Page() {
  let testProductData = {
    id: 'test',
    product_name: 'test_name',
    price: 300,
    rating: 3,
    rating_count: 24,
    image: 'https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/461326/item/phgoods_24_461326.jpg?width=320'
  }

  return (
    <main className='pt-0'>
      <ShopHeader
        title={'kids'}
        className={'text-white'}
        imagesrc={'https://www.uniqlo.com/jp/ja/contents/feature/lifewear-collection/common_23fw/img/kids/kv_pc.jpg'}
      />
      <ProductCollection className={'my-5'}>
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
        <Product data={testProductData} />
      </ProductCollection>
    </main>
  )
}

export default Page