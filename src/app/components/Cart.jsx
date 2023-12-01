'use client'

import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Input
} from 'reactstrap'
import { deleteDocument, editDocument, getDocument, getRefFromId } from '../scripts/database-functions'

function CartItem({ data, itemIndex, user_id }) {
  return (
    <Card className='mb-3'>
      <CardHeader className='fw-bold text-muted'>
        <big>Item No. {itemIndex + 1}</big>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={1} sm={12} className='d-flex align-items-center'>
            <FormGroup check>
              <Input type="checkbox" />
            </FormGroup>
          </Col>
          <Col md={2} sm={12} className='d-flex align-items-center'>
            <img src={data.images[0]} className='w-50' alt="" />
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
            <p className='fw-bold fs-3'>PHP {data.new_price}</p>
          </Col>
          <Col md={2} sm={12} className='d-flex align-items-center'>
            <dir>
              <button
                type="button"
                className="btn btn-danger btn-sm my-1 w-100"
                onClick={async () => {
                  let user_data = await getDocument('user-test', user_id)
                  let user_cart_copy = user_data.cart

                  user_cart_copy.splice(itemIndex, itemIndex)

                  user_data.cart = user_cart_copy

                  console.log(user_cart_copy);

                  editDocument('user-test', user_data, user_id)
                }}
              >
                Delete
              </button>
              <a
                type="button"
                className="btn btn-info btn-sm my-1 w-100"
                href={`${data.extra_details.category.group.toLowerCase()}/${data.id}`}
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