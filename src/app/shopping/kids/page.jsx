import {
  ProductCard,
  ProductCardCollection,
  ProductBanner,
  ProductBannerAlt,
  ProductCardCategoryCollection,
  ProductCardCategory,
  ProductCardCart,
  ProductComingSoonContainer
} from "@/app/components/Product"

import { getCollection, getCollectionFiltered } from "@/app/scripts/database-functions"

async function Page() {
  let data = await getCollectionFiltered('product-test', 'Kids', 8, "group");
  let cards = []

  try {
    cards = data.map(data => <ProductCard data={data} />)
  }
  catch (error) {
    cards = <ProductCard data={data[0]} />
  }

  return (
    <main className='pt-0'>
      <ProductBanner
        title={'kids'}
        className={'text-white'}
        imagesrc={'https://www.uniqlo.com/jp/ja/contents/feature/lifewear-collection/common_23fw/img/kids/kv_pc.jpg'}
      />
      <h1 className="text-center my-5">Best Sellers</h1>
      <ProductCardCollection>
        {[cards]}
      </ProductCardCollection>
      <ProductBannerAlt className={'text-white brand-offer text-center lh-1'} imagesrc={'https://www.uniqlo.com/jp/ja/contents/feature/lifewear-collection/common_23fw/img/kids/kv_pc.jpg'}>
        <div>
          <h3>Discount up to 40% off!</h3>
          <h1>Grand Sale Offer!</h1>
          <button
            type="button"
            className="btn btn-secondary btn-circle btn-lg btn-circle me-2"
          >
            Buy Now
          </button>
        </div>
      </ProductBannerAlt>
      <h1 className="text-center my-5">Limited Edition</h1>
      <ProductCardCollection className='mb-5'>
        <ProductCardCart data={data[0]} />
        <ProductCardCart data={data[0]} />
        <ProductCardCart data={data[0]} />
        <ProductCardCart data={data[0]} />
      </ProductCardCollection>
    </main>
  )
}

export default Page