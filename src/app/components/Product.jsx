'use client'

import styles from '@/app/shopping.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke, faCartShopping, faX } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarStroke } from '@fortawesome/free-regular-svg-icons'

import '@/lib/react-innner-image-zoom.min.css'

import {
  Row,
  Col,
  Container,
  Input,
  Carousel,
  CarouselItem,
  CarouselControl,
  Modal,
  ModalBody
} from 'reactstrap'

import { usePathname } from 'next/navigation'

import { useState } from 'react'

import { useScreenSize } from '@/app/scripts/custom-hooks'

import InnerImageZoom from 'react-inner-image-zoom';
import ReadMoreReact from 'read-more-react'

import { getDocument, getRefFromId, getRandomId, editDocument } from '../scripts/database-functions'

import { useRouter } from 'next/navigation'
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/app/scripts/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


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
      (element, idx) => {
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
        (element, idx) => {
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

function ProductCard({ data, fromProductPage }) {
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
        <div className='position-relative' style={{ height: 125 }}>
          <div className="mt-3">
            <ProductRating rating={data.rating} popularity={data.rating_count} />
          </div>
          <p className="mt-1 mb-2 text-muted fw-bold">{data.product_name}</p>
          <div className='w-100 position-absolute bottom-0'>
            {data.old_price === 0 ? null : <small className='strike-through fw-bold fs-7 m-0 lh-1'>PHP {data.old_price}</small>}
            <p className='text-danger fw-bold fs-4 m-0 lh-1'>
              PHP {data.new_price}&nbsp;
            </p>
          </div>
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

function ProductContainer({ children, className }) {
  if (children.length > 1) return (
    <Container className='my-5'>
      <Row>
        {children.map((child, idx, arr) => <Col sm={12} md={(12 / arr.length)} key={idx}>{child}</Col>)}
      </Row>
    </Container>
  )
  else return (
    <Container className={`my-5 ${className}`}>
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

function ProductBody({ children }) {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  )
}

function ProductControls({ id }) {
  const [user, loading, error] = useAuthState(auth);
  const [isModal, setIsModal] = useState(false);

  const ref = getRefFromId('product-test', id)
  const router = useRouter()

  async function addToCartHandler() {
    let data = await getDocument('user-test', user?.uid)

    setIsModal(true)

    if (!data || !user) return router.push('/login')
    if (data.cart == undefined) { data.cart = [] }
    if (!data.cart.some(e => e.id === ref.id)) {
      data.cart.push(ref)
      setDoc(doc(collection(db, 'user-test'), user.uid), data)
    }
  }

  async function buyHandler() {
    let data = await getDocument('user-test', user?.uid)

    if (!data || !user) return router.push('/login')

    let receipt_id = getRandomId()
    let product_details = await getDocument('product-test', id)

    await editDocument('order-receipt-test', {
      buyer_id: user.uid,
      date: serverTimestamp(),
      id: receipt_id,
      items: [{
        cost: parseInt(product_details.new_price),
        id: id,
        reference: ref
      }],
      shipping_fee: Math.floor((Math.random() * 500) + 50)
    }, receipt_id)

    router.push(`/shopping/cart/checkout/${receipt_id}`)
  }

  if (!user) {
    return (
      <>
        <Skeleton height={50} width={400}/>
      </>
    )
  } else {
    return (
      <>
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
          onClick={addToCartHandler}
        >
          Add to cart <FontAwesomeIcon icon={faCartShopping} />
        </button>
        <button
          type="button"
          className="btn btn-danger btn-circle btn-lg btn-circle me-2"
          onClick={buyHandler}
        >
          Buy Now
        </button>
        <Modal isOpen={isModal} centered={true} toggle={() => setIsModal(!isModal)}>
          <ModalBody className='position-relative'>
            <div className='position-absolute top-0 end-0 p-2 lh-1 text-muted fw-bold' role='button' onClick={() => setIsModal(false)}>
              <FontAwesomeIcon icon={faX} className='fa-xs'/>
            </div>
            <center>
              <h1 className='text-centered text-break'>{}</h1>
              <p className='m-0'>Item has been added to cart!</p>
            </center>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

function ProductRating({ rating = 0, popularity = 0 }) {
  let stars = []

  for (let i = 0; i < 5; i++) {
    if (!Number.isInteger(rating)) {
      if (i < Math.ceil(rating) - 1) stars.push(<FontAwesomeIcon key={`${i}-${rating}-${popularity}`} icon={faStar} />)
      else if (i < Math.ceil(rating)) stars.push(<FontAwesomeIcon key={`${i}-${rating}-${popularity}`} icon={faStarHalfStroke} />)
      else stars.push(<FontAwesomeIcon key={`${i}-${rating}-${popularity}`} icon={faStarStroke} />)
    } else {
      if (i < rating) stars.push(<FontAwesomeIcon key={`${i}-${rating}-${popularity}`} icon={faStar} />)
      else stars.push(<FontAwesomeIcon key={`${i}-${rating}-${popularity}`} icon={faStarStroke} />)
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
      key={images[idx]}
    >
      <div className='box-aspect'>
        <InnerImageZoom src={src} zoomScale={5} zoomType='hover' className='w-100' />
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

function ProductLoading() {
  return (
    <>
      <ProductContainer>
        <div>
          <Skeleton height={500} />
        </div>
        <div className='position-relative h-100'>
          <Skeleton height={50} />
          <Skeleton height={50} className='my-3 w-50' />
          <Skeleton count={10} />
          <Skeleton className='position-absolute bottom-0 start-0' width={400} height={50} />
        </div>
      </ProductContainer>
      <div>
        <center className='mb-5'><Skeleton width={200} height={52} /></center>
        <ProductCardCollection className='mb-5'>
          <Skeleton height={400} />
          <Skeleton height={400} />
          <Skeleton height={400} />
          <Skeleton height={400} />
        </ProductCardCollection>
      </div>
    </>
  )
}

export {
  ProductCard,
  ProductCardCollection,
  ProductContainer,
  ProductHeader,
  ProductBody,
  ProductControls,
  ProductRating,
  ProductPrice,
  ProductDescription,
  ProductGallery,
  ProductCardCategoryCollection,
  ProductBanner,
  ProductBannerAlt,
  ProductCardCart,
  ProductCardCategory,
  ProductComingSoonContainer,
  ProductLoading
}