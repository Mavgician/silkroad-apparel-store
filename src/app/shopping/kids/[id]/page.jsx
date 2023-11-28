'use client'

import styles from '@/app/shopping.module.css'

import {
  Container,
  Col,
  Row,
  Input,
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarStroke } from '@fortawesome/free-regular-svg-icons'

import { useState, useEffect } from 'react';
import Loading from '@/app/loading';

function Page({ params }) {
  const [productDetails, setProductDetails] = useState(null);
  const [productStars, setProductStars] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  /* const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const items = [
    {
      src: 'https://picsum.photos/id/123/2000',
      altText: 'Slide 1',
      key: 1,
    },
    {
      src: 'https://picsum.photos/id/456/2000',
      altText: 'Slide 2',
      key: 2,
    },
    {
      src: 'https://picsum.photos/id/678/2000',
      altText: 'Slide 3',
      key: 3,
    },
  ];

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className='w-100'
      >
        <img src={item.src} alt={item.altText}/>
      </CarouselItem>
    );
  }); */

  function getDetails() {
    let testData = {
      product_name: 'test',
      old_price: 500,
      new_price: 100,
      description: 'A short description about this thing. Test is a word used to describe a challenge or an observation of some sorts.',
      rating: 3.2,
      rating_count: 21,
      images: [
        'https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/461326/item/phgoods_24_461326.jpg?width=320',
        'https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/461326/item/phgoods_24_461326.jpg?width=320',
        'https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/461326/item/phgoods_24_461326.jpg?width=320'
      ],
      id: 'test_id_new'
    }

    let stars = []

    for (let i = 0; i < 5; i++) {
      if (!Number.isInteger(testData.rating)) {
        if (i < Math.ceil(testData.rating) - 1) stars.push(<FontAwesomeIcon icon={faStar} />)
        else if (i < Math.ceil(testData.rating)) stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />)
        else stars.push(<FontAwesomeIcon icon={faStarStroke} />)
      } else {
        if (i < testData.rating) stars.push(<FontAwesomeIcon icon={faStar} />)
        else stars.push(<FontAwesomeIcon icon={faStarStroke} />)
      }
    }

    setProductStars(stars)
    setProductDetails(testData)
    setIsLoading(false)
  }

  useEffect(() => {
    getDetails()
  }, []);

  if (isLoading) {
    return <Loading />
  }
  else return (
    <main>
      <Container>
        <Row>
          <Col>
            test
          </Col>
          <Col>
            <h1>
              test
            </h1>
            <div className="mt-3">
              {productStars}
              <span className='text-muted'> {productDetails.rating} ({productDetails.rating_count})</span>
            </div>
            <p className='fw-bold m-0 lh-1 my-3'>
              <span className='fs-5 strike-through'>PHP {productDetails.old_price}</span><br />
              <span className='fs-1 text-danger'>PHP {productDetails.new_price}</span>
            </p>
            <p className='mt-5'>{productDetails.description}</p>
            <div className='text-muted'>
              <p className='m-0'><span className='fw-bold'>Availability: </span> In stock</p>
              <p className='m-0'><span className='fw-bold'>Category: </span> Top - Women</p>
              <p className='m-0'><span className='fw-bold'>Shipping Area: </span> Everywhere</p>
              <p className='m-0'><span className='fw-bold'>Shipping Fee: </span> Free</p>
            </div>
            <div className='d-flex mt-5'>
              <Input type="select" className={`${styles['product-page-quantity']} me-2`}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Input>
              <button
                type="button"
                className="btn btn-primary btn-circle btn-lg btn-circle me-2"
              >
                Add to cart <FontAwesomeIcon icon={faCartShopping} />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-circle btn-lg btn-circle me-2"
              >
                Buy Now
              </button>
            </div>
            <div className='d-flex'>

            </div>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Page