'use client'

import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from 'reactstrap'
import { deleteDocument, editDocument, getDocument, getRefFromId } from '../scripts/database-functions'

function CartItem({ data, itemIndex, user_id, docRef }) {
  return (
    <Card className='mb-3'>
      <CardHeader className='fw-bold text-muted'>
        <big>Item No. {itemIndex + 1}</big>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={2} sm={12}>
            <img src={data.images[0]} className='w-100' alt="" />
          </Col>
          <Col md={4} sm={12}>
            <p className='fw-bold'>{data.product_name}</p>
          </Col>
          <Col md={2} sm={12}>
            Quantity
            <p>{1}</p>
          </Col>
          <Col md={2} sm={12}>
            Item subtotal
            <p className='fw-bold'>PHP {data.new_price}</p>
          </Col>
          <Col md={2} sm={12}>
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
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export { CartItem }