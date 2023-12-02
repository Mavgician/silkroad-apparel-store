'use client'

import { getDocument, getDocumentFromRef, getCurrentUser } from '@/app/scripts/database-functions'
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from 'reactstrap'

import { CartItem } from '@/app/components/Cart.jsx'

import { useEffect, useState } from "react";

import { useRouter, usePathname } from 'next/navigation';

async function Page() {
  const router = useRouter()
  const currentPath = usePathname()

  let [cards, setCards] = useState([])

  async function updateUserData() {
    let userData = await getDocument('user-test', getCurrentUser().uid)
    let cart_cards = []

    for (let i = 0; i < userData.cart.length; i++) {
      let details = (await getDocumentFromRef(userData.cart[i])).data()
  
      cart_cards.push(
        <CartItem data={details} itemIndex={i} user_id={userData.id} deleteCallback={updateUserData}/>
      )
    }

    setCards(cart_cards)
  }

  useEffect(() => {
    if (!getCurrentUser()) return router.push('/login')
    else updateUserData()
  }, []);

  return (
    <main>
      <Container className='mb-5'>
        <Row>
          <Col md={9} sm={12}>
            <h1>Shopping Cart</h1>
            {[cards]}
          </Col>
          <Col md={3} sm={12} className='position-relative'>
            <div>
              <Card>
                <CardBody>
                  <h4>Order Summary <small className='text-muted fw-normal'>| {cards.length} item(s)</small></h4>
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
                onClick={() => {
                  router.push(`${currentPath}/receipt`)
                }}
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