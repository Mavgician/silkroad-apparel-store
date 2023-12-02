'use client'

import { getDocument, getDocumentFromRef } from '@/app/scripts/database-functions';
import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap'

function Orders({data}) {
  return (
    <Row className='mb-3'>
      <Col md={3} sm={12}>
        <img src={data.images[0]} alt="" className='w-100'/>
      </Col>
      <Col md={9} sm={12}>
        <h2>{data.product_name}</h2>
        <Row>
          <Col md={1} sm={12}>
            <h5 className='m-0'>Type</h5>
            <p className='m-0'>{data.extra_details.category.type}</p>
          </Col>
          <Col md={1} sm={12}>
            <h5 className='m-0'>Group</h5>
            <p className='m-0'>{data.extra_details.category.group}</p>
          </Col>
          <Col md={1} sm={12}>
            <h5 className='m-0'>Quantity</h5>
            <p className='m-0'>1</p>
          </Col>
        </Row>
        <h3 className='text-danger my-3'>
          PHP {data.new_price}
        </h3>
      </Col>
    </Row>
  )
}

function Page({params}) {
  const [randShipFee, setRandShipFee] = useState(0);
  const [items, setItems] = useState([]);

  function objectSum(obj, key) {
    let arr = []
    
    obj.forEach(element => {
      arr.push(element[key])
    });

    if (arr.length > 0) return arr.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue))
    else return 0
  }

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('query')))
    setRandShipFee(Math.floor((Math.random() * 500) + 50))
  }, [])

  return (
    <main>
      <Container className='px-5 mb-5'>
        <div className='lh-1'>
          <h1 className='m-0'>Hi user</h1>
          <h3 className='m-0'>Thank you for your order!</h3>
        </div>
        <h3 className='mt-5'>
          DATE OF ORDER: 12-02-23
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
            <p className='m-0'>user</p>
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
        {
          items.map(data => <Orders data={data}/>)
        }
        <hr />
        <div className='d-flex justify-content-end mb-5'>
          <div style={{ width: 300 }}>
            <Row>
              <Col>
                <p className='m-0'>Subtotal</p>
                <p className='m-0'>VAT included</p>
                <p className='m-0'>Shipping Fee</p>
              </Col>
              <Col className='fw-bold'>
                <p className='m-0'>PHP {objectSum(items, 'new_price')}</p>
                <p className='m-0'>PHP 0</p>
                <p className='m-0'>PHP {randShipFee}</p>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>
                <p className='m-0'>Order Total</p>
              </Col>
              <Col className='fw-bold'>
                <p className='m-0 fs-4'>PHP {objectSum(items, 'new_price') + randShipFee}</p>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Page