import {
  ProductContainer,
  ProductHeader,
  ProductBody,
  ProductRating,
  ProductPrice,
  ProductGallery,
  ProductCardCollection,
  ProductCard,
  ProductDescription,
  ProductControls
} from '@/app/components/Product'

import { getDocument, getCollectionFiltered } from '@/app/scripts/database-functions'

export async function generateStaticParams() {
  const collection = await getCollectionFiltered('product-test', 'Men', 20, 'group');
  let product_ids = []

  collection.forEach(data => product_ids.push({id: data.id}))

  return product_ids
}


async function Page({ params }) {
  let data = await getDocument('product-test', params.id);
  let suggested_data = await getCollectionFiltered('product-test', data.extra_details.category.type);

  let cards = []

  try {
    suggested_data.map(data => {
      if (data.id != params.id) cards.push(<ProductCard data={data} fromProductPage={true}/>)
    })
  }
  catch (error) {
    if (data.id != params.id) cards = <ProductCard data={suggested_data[0]} fromProductPage={true}/>
  }

  return (
    <main>
      <ProductContainer>
        <div>
          <ProductGallery images={data.images}/>
        </div>
        <div>
          <ProductHeader>
            <h1>{data.product_name}</h1>
            <ProductRating rating={data.rating} popularity={data.rating_count} />
            <ProductPrice oldPrice={data.old_price} newPrice={data.new_price} />
          </ProductHeader>
          <ProductBody available={data.extra_details.available}>
            <ProductDescription>{data.description}</ProductDescription>
            <div className='text-muted'>
              <p className='m-0'>
                <span className='fw-bold'>Availability: </span>
                {data.extra_details.available ? 'In Stock' : 'n/a'}
              </p>
              <p className='m-0'>
                <span className='fw-bold'>Category: </span>
                <span className='text-uppercase'>
                  {data.extra_details.category.type} - {data.extra_details.category.group}
                </span>
              </p>
              <p className='m-0'>
                <span className='fw-bold'>Shipping Area: </span>
                {data.extra_details.shipping_area.length === 0 ? 'n/a' : data.extra_details.shipping_area}
              </p>
              <p className='m-0'>
                <span className='fw-bold'>Shipping Fee: </span>
                {data.extra_details.shipping_fee === 0 ? 'Free' : data.extra_details.shipping_fee}
              </p>
            </div>
            <div className='d-flex mt-5'>
              {data.extra_details.available ? <ProductControls id={data.id}/> : <h1 className='text-danger'>Not Available</h1>}
            </div>
          </ProductBody>
        </div>
      </ProductContainer>
      {
        cards.length ?
        <div className='my-5'>
          <h1 className='text-center mb-5'>Similar Products</h1>
          <ProductCardCollection>
            {[cards]}
          </ProductCardCollection>
        </div> : null
      }
    </main>
  )
}

export default Page