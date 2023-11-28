import styles from '@/app/shopping.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarStroke } from '@fortawesome/free-regular-svg-icons'

import { Row, Col, Container } from 'reactstrap'
import { usePathname } from 'next/navigation'

function Product({ data }) {
  let currentPath = usePathname()
  let stars = []

  for (let i = 0; i < 5; i++) {
    if (!Number.isInteger(data.rating)) {
      if (i < Math.ceil(data.rating) - 1) stars.push(<FontAwesomeIcon icon={faStar} />)
      else if (i < Math.ceil(data.rating)) stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />)
      else stars.push(<FontAwesomeIcon icon={faStarStroke} />)
    } else {
      if (i < data.rating) stars.push(<FontAwesomeIcon icon={faStar} />)
      else stars.push(<FontAwesomeIcon icon={faStarStroke} />)
    }
    
  }

  return (
    <div className={`p-1 mb-2 ${styles.product}`}>
      <a href={`${currentPath}/${data.id}`} className='text-decoration-none text-black'>
        <div className="position-relative">
          <img src={data.image} className="w-100" />
        </div>
        <div>
          <div className="mt-3">
            {stars}
            <span className='text-muted'> ({data.rating_count})</span>
          </div>
          <p className="my-1">{data.product_name}</p>
          <p className='text-danger fw-bold fs-4 m-0'>PHP {data.price}</p>
        </div>
      </a>
    </div>
  )
}

function ProductCollection({ children, className }) {

  const products = children.map(
    element => <Col md={6} lg={4} xl={3}>{element}</Col>
  )

  return (
    <Container className={`${className}`}>
      <Row>
        {products}
      </Row>
    </Container>
  )
}

export { Product, ProductCollection }