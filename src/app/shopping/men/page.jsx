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
  let data = await getCollectionFiltered('product-test', 'Men', 20, "group");
  let cards = []

  try {
    data.map(data => { cards.push(<ProductCard data={data} />) })
  }
  catch (error) {
    cards = <ProductCard data={data[0]} />
  }

  return (
    <main className='pt-0'>
      <ProductBanner
        title={'Men'}
        className={'text-white'}
        imagesrc={'https://im.uniqlo.com/global-cms/spa/res4458808a522eadae8916bf77a056f1dffr.jpg'}
      />
      <h1 className="text-center my-5">Best Sellers</h1>
      <ProductCardCollection>
        {[cards]}
      </ProductCardCollection>
      <ProductBannerAlt className={'text-white brand-offer text-center lh-1'} imagesrc={'https://im.uniqlo.com/global-cms/spa/res0e72eb11f9e8c1c20eaf437391310f8ffr.jpg'}>
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