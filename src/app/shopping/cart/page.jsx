import { getDocument, getDocumentFromRef } from '@/app/scripts/database-functions'
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from 'reactstrap'

import { CartItem } from '@/app/components/Cart.jsx'

async function Page() {
  let user_data = await getDocument('user-test', 'lMfw8uvoq8qR9XaWTKat')

  let cart_detail = []
  let cart_cards = []

  for (let i = 0; i < user_data.cart.length; i++) {
    cart_detail.push((await getDocumentFromRef(user_data.cart[i])).data())
  }

  for (let i = 0; i < cart_detail.length; i++) {
    cart_cards.push(
      <CartItem data={cart_detail[i]} itemIndex={i} user_id={'lMfw8uvoq8qR9XaWTKat'} />
    )
  }

  return (
    <main>
      <Container className='mb-5'>
        <Row>
          <Col md={9} sm={12}>
            <h1>Shopping Cart</h1>
            {[cart_cards]}
          </Col>
          <Col md={3} sm={12} className='position-relative'>
            <div>
              <Card>
                <CardBody>
                  <h4>Order Summary <small className='text-muted fw-normal'>| 0 item(s)</small></h4>
                  <div>
                    <p className='my-2'>Item(s) Subtotal:</p>
                    <p className='my-2'>Shipping fee:</p>
                    <p className='my-2 fw-bold'>Order Total: </p>
                  </div>
                </CardBody>
              </Card>
              <button
                type="button"
                className="btn btn-success btn-lg my-3 w-100"
              >
                Proceed to checkout
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Page