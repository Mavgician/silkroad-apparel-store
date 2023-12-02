'use client'

import {
  Container,
  Row,
  Col
} from 'reactstrap'

function Page() {
  return (
    <main>
      <Container className='px-5 mb-5'>
        <div className='lh-1'>
          <h1 className='m-0'>Hi John</h1>
          <h3 className='m-0'>Thank you for your order!</h3>
        </div>
        <h3 className='mt-5'>
          DATE OF ORDER: 12-01-23
        </h3>
        <div>
          <p className='m-0'>Order number: 1220088882104021257-0234169</p>
          <p className='m-0'>Order class: Online store</p>
          <p className='m-0'>Order status: On the way</p>
          <p className='m-0'>Delivery by: Airfreight 2100 Inc.</p>
          <p className='m-0'>Delivery slip number: 120200120601</p>
          <p className='m-0'>Estimated delivery time: 11/28/2023 - 12/5/2023</p>
        </div>
        <Row className='my-5'>
          <Col md={6} sm={12}>
            <h5 className='m-0'>Delivery Address</h5>
            <p className='m-0'>John Doe</p>
            <p className='m-0'>211 Aurora blvd., Quezon City</p>
            <p className='m-0'>09070617465</p>
          </Col>
          <Col md={6} sm={12}>
            <h5 className='m-0'>Payment Method</h5>
            <p className='m-0'>GCash</p>
          </Col>
        </Row>
        <hr />
        <h5>Order Details</h5>
        <Row>
          <Col md={3} sm={12}>
            <img src="https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/455471/item/phgoods_32_455471.jpg?width=250" alt="" />
          </Col>
          <Col md={9} sm={12}>
            <h2>Ultra Stretch Jeans</h2>
            <Row>
              <Col md={1} sm={12}>
                <h5 className='m-0'>Color</h5>
                <p className='m-0'>Beige</p>
              </Col>
              <Col md={1} sm={12}>
                <h5 className='m-0'>Size</h5>
                <p className='m-0'>Medium</p>
              </Col>
              <Col md={1} sm={12}>
                <h5 className='m-0'>Quantity</h5>
                <p className='m-0'>1</p>
              </Col>
            </Row>
            <h3 className='text-danger my-3'>
              PHP 1499.00
            </h3>
          </Col>
        </Row>
        <hr />
        <div className='float-end' style={{width: 300}}>
          <Row>
            <Col>
              <p className='m-0'>Subtotal</p>
              <p className='m-0'>VAT included</p>
              <p className='m-0'>Shipping Fee</p>
            </Col>
            <Col className='fw-bold'>
              <p className='m-0'>PHP 1499.00</p>
              <p className='m-0'>PHP 149.00</p>
              <p className='m-0'>0.0</p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p className='m-0'>Order Total</p>
            </Col>
            <Col className='fw-bold'>
              <p className='m-0 fs-4'>PHP 1499.00</p>
            </Col>
          </Row>
        </div>
      </Container>
    </main>
  )
}

export default Page