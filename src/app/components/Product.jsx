'use client'

import styles from '@/app/shopping.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarStroke } from '@fortawesome/free-regular-svg-icons'

import '@/lib/react-innner-image-zoom.min.css'

import {
  Row,
  Col,
  Container,
  Input,
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap'

import { usePathname } from 'next/navigation'

import { useState } from 'react'

import { useScreenSize } from '@/app/scripts/custom-hooks'

import InnerImageZoom from 'react-inner-image-zoom';
import ReadMoreReact from 'read-more-react'

/* Product Listing Layouts */

function ProductCardCategoryCollection({ children, className }) {
  try {
    const products = children[0].map(
      element => {
        return <Col md={6} lg={4}>{element}</Col>
      }
    )

    return (
      <Container className={`${className}`}>
        <Row>
          {products}
        </Row>
      </Container>
    )

  } catch (error) {
    if (children.length > 1) {
      const products = children.map(
        element => {
          return <Col md={6} lg={4}>{element}</Col>
        }
      )
      return (
        <Container className={`${className}`}>
          <Row>
            {products}
          </Row>
        </Container>
      )
    } else {
      return (
        <Container className={`${className}`}>
          <Row>
            <Col md={6} lg={4}>{children}</Col>
          </Row>
        </Container>
      )
    }
  }
}

function ProductCardCollection({ children, className }) {
  try {
    const products = children[0].map(
      element => {
        return <Col md={6} lg={4} xl={3}>{element}</Col>
      }
    )

    return (
      <Container className={`${className}`}>
        <Row>
          {products}
        </Row>
      </Container>
    )

  } catch (error) {
    if (children.length > 1) {
      const products = children.map(
        element => {
          return <Col md={6} lg={4} xl={3}>{element}</Col>
        }
      )
      return (
        <Container className={`${className}`}>
          <Row>
            {products}
          </Row>
        </Container>
      )
    } else {
      return (
        <Container className={`${className}`}>
          <Row>
            <Col md={6} lg={4} xl={3}>{children}</Col>
          </Row>
        </Container>
      )
    }
  }
}

function ProductBanner({ className, imagesrc, title }) {
  let screenSize = useScreenSize()

  return (
    <Container fluid className={`overflow-hidden py-5 p-0 m-0 mb-5 ${styles.header} ${className}`}>
      <div className='position-relative'>
        <div className='h-100 w-100 d-flex align-items-center justify-content-center'>
          <p className='text-uppercase position-relative fw-bolder'>{title}</p>
        </div>
        <img className={`${screenSize.height > screenSize.width ? 'h-100' : 'w-100'} top-0 start-0 position-absolute`} src={imagesrc} />
      </div>
    </Container>
  )
}

function ProductBannerAlt({ className, imagesrc, children }) {
  let screenSize = useScreenSize()

  return (
    <Container fluid className={`overflow-hidden py-5 p-0 m-0 mb-5 ${styles.header} ${className}`}>
      <div className='position-relative'>
        <div className='h-100 w-100 d-flex align-items-center justify-content-center'>
          {children}
        </div>
        <img className={`${screenSize.height > screenSize.width ? 'h-100' : 'w-100'} top-0 start-0 position-absolute`} src={imagesrc} />
      </div>
    </Container>
  )
}

function ProductComingSoonContainer({ children }) {
  return (
    <Container>
      <Row>
        {children}
      </Row>
    </Container>
  )
}

/* Product Card Components */

function ProductCard({ data, fromProductPage}) {
  let currentPath = usePathname()

  if (fromProductPage) {
    let newPath = currentPath.split('/')
    newPath.pop()
    currentPath = newPath.join('/')
  }


  return (
    <div className={`p-1 mb-2 ${styles.product}`}>
      <a href={`${currentPath}/${data.id}`} className='text-decoration-none text-black'>
        <div className="position-relative overflow-hidden d-flex justify-content-center align-items-center" style={{ maxHeight: 300, height: 300 }}>
          <img src={data.images[0]} className="w-100" />
        </div>
        <div>
          <div className="mt-3">
            <ProductRating rating={data.rating} popularity={data.rating_count} />
          </div>
          <p className="mt-1 mb-2 text-muted fw-bold">{data.product_name}</p>
          {data.oldPrice === 0 ? null : <small className='strike-through fw-bold fs-7 m-0 lh-1'>PHP {data.old_price}</small>}
          <p className='text-danger fw-bold fs-4 m-0 lh-1'>
            PHP {data.new_price}&nbsp;
          </p>
        </div>
      </a>
    </div>
  )
}

function ProductCardCart({ data }) {
  let currentPath = usePathname()

  return (
    <div className={`p-1 mb-2 ${styles.product}`}>
      <a href={`${currentPath}/${data.id}`} className='text-decoration-none text-black'>
        <div className="position-relative overflow-hidden d-flex justify-content-center align-items-center" style={{ maxHeight: 300, height: 300 }}>
          <img src={data.images[0]} className="w-100" />
        </div>
        <div className='text-center'>
          <p className="mt-4 mb-2 text-muted fw-bold">{data.product_name}</p>
          <p className='text-danger fw-bold fs-4 mt-4 m-0'>
            PHP {data.new_price}
          </p><button
            type="button"
            className="btn btn-secondary btn-circle btn-md mt-3 btn-circle me-2 pe-none"
          >
            Buy Now
          </button>
        </div>
      </a>
    </div>
  )
}

function ProductCardCategory({ title, imagesrc, path }) {
  let currentPath = usePathname()
  let screenSize = useScreenSize()

  return (
    <div className={`p-0 mb-2 border ${styles.product}`}>
      <a href={`${currentPath}/${path}`} className='text-decoration-none text-black'>
        <div className="position-relative overflow-hidden d-flex justify-content-center align-items-center" style={{ maxHeight: 300, height: 300 }}>
          <img src={imagesrc} className={screenSize.height > screenSize.width ? 'w-100' : 'h-100'} />
        </div>
        <div className='p-3'>
          <p className='text-center fs-4 m-0'>{title}</p>
        </div>
      </a>
    </div>
  )
}

/* Product Page Components */

function ProductContainer({ children }) {
  if (children.length > 1) return (
    <Container className='my-5'>
      <Row>
        {children.map((child, idx, arr) => <Col sm={12} md={(12 / arr.length)}>{child}</Col>)}
      </Row>
    </Container>
  )
  else return (
    <Container className='my-5'>
      <Row>
        {<Col sm={12} md={12}>{children}</Col>}
      </Row>
    </Container>
  )
}

function ProductHeader({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

function ProductBody({ children, available }) {

  const controls = () => <>
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
  </>

  return (
    <>
      <div>
        {children}
      </div>
      <div className='d-flex mt-5'>
        {available ? controls() : <h1 className='text-danger'>Not Available</h1>}
      </div>
    </>
  )
}

function ProductRating({ rating = 0, popularity = 0 }) {
  let stars = []

  for (let i = 0; i < 5; i++) {
    if (!Number.isInteger(rating)) {
      if (i < Math.ceil(rating) - 1) stars.push(<FontAwesomeIcon icon={faStar} />)
      else if (i < Math.ceil(rating)) stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />)
      else stars.push(<FontAwesomeIcon icon={faStarStroke} />)
    } else {
      if (i < rating) stars.push(<FontAwesomeIcon icon={faStar} />)
      else stars.push(<FontAwesomeIcon icon={faStarStroke} />)
    }
  }

  return (
    <div className="mt-3">
      {stars}
      <span className='text-muted'> {rating} ({popularity})</span>
    </div>
  )
}

function ProductPrice({ newPrice, oldPrice }) {
  return (
    <p className='fw-bold m-0 lh-1 my-3'>
      {oldPrice === 0 ? null : <span className='fs-5 strike-through'>PHP {oldPrice}</span>}<br />
      <span className='fs-1 text-danger'>PHP {newPrice}</span>
    </p>
  )
}

function ProductDescription({ children }) {
  return (
    <div className='my-4'>
      <big>Description:</big>
      <div className='mt-2'>
        <ReadMoreReact text={children} ideal={700} max={800} />
      </div>
    </div>
  )
}

function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  let slides = [...images]

  slides.forEach((src, idx) => slides[idx] =
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
    >
      <div className='box-aspect'>
        <InnerImageZoom src={src} zoomScale={5} zoomType='hover' width='100%' />
      </div>
    </CarouselItem>)

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
      style={{ minHeight: 315, maxHeight: 630 }}
      className='overflow-hidden'
    >
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  )
}

export {
  ProductCard,
  ProductCardCollection,
  ProductContainer,
  ProductHeader,
  ProductBody,
  ProductRating,
  ProductPrice,
  ProductDescription,
  ProductGallery,
  ProductCardCategoryCollection,
  ProductBanner,
  ProductBannerAlt,
  ProductCardCart,
  ProductCardCategory,
  ProductComingSoonContainer
}