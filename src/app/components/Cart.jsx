'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input
} from 'reactstrap'

function CartItem({ data, itemIndex, user_id, deleteCallback, checkCallback }) {
  const [openModal, setModal] = deleteCallback

  const [checkbox, setCheckbox] = useState(false);

  function handleCheckbox(e) {
    setCheckbox(e.target.checked)

    if(e.target.checked) checkCallback(itemIndex, true)
    else checkCallback(itemIndex, false)
  }

  return (
    <Card className='mb-3'>
      <CardBody>
        <Row>
          <Col md={1} sm={12} className='d-flex align-items-center'>
            <FormGroup check>
              <Input type="checkbox" onChange={handleCheckbox} checked={checkbox}/>
            </FormGroup>
          </Col>
          <Col md={2} sm={12} className='d-flex align-items-center'>
            <Image src={data.images[0]} className='w-50' alt="" />
          </Col>
          <Col md={4} sm={12}>
            <p className='text-muted text-uppercase lh-1 m-0'>
              <small>
                {data.extra_details.category.type} - {data.extra_details.category.group}
              </small>
            </p>
            <p className='fw-bold'>{data.product_name}</p>
          </Col>
          <Col md={1} sm={12}>
            Quantity
            <Input type="select" className={`me-2`}>
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
          </Col>
          <Col md={2} sm={12}>
            Item subtotal
            <p className='fw-bold fs-4'>PHP {data.new_price}</p>
          </Col>
          <Col md={2} sm={12} className='d-flex align-items-center'>
            <dir>
              <button
                type="button"
                className="btn btn-danger btn-sm my-1 w-100"
                onClick={() => {
                  setModal(
                    {
                      id: user_id,
                      index: itemIndex,
                      name: data.product_name
                    }
                  )
                  openModal(true)
                  console.log(deleteCallback);
                }}
              >
                Delete
              </button>
              <a
                type="button"
                className="btn btn-info btn-sm my-1 w-100"
                href={`/shopping/${data.extra_details.category.group.toLowerCase()}/${data.id}`}
              >
                Go to page
              </a>
            </dir>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export { CartItem } 