'use client'

import { getDocument, getDocumentFromRef, editDocument, getRandomId } from '@/app/scripts/database-functions'
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Modal,
  ModalBody
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCheck } from '@fortawesome/free-solid-svg-icons'

import { CartItem } from '@/app/components/Cart.jsx'

import { useRouter, usePathname } from 'next/navigation';

import { useEffect, useState } from 'react'

function ConfirmationModal({
  submitCallback,
  modalCallback,
  isOpen,
  name
}) {
  return (
    <Modal toggle={() => modalCallback(!isOpen)} isOpen={isOpen} unmountOnClose={true} centered={true}>
      <ModalBody className='p-0'>
        <Card className='bg-light shadow border-0'>
          <CardHeader className=" bg-white py-3 px-4">
            <div className="text-danger mb-3 d-block fw-bold">
              <big>Are you sure?</big>
            </div>
            <p>You are removing <b>{name}</b>.</p>
          </CardHeader>
          <CardBody className='d-flex justify-content-end'>
            <button
              type="button"
              className="btn btn-outline-danger mx-1"
              onClick={() => { modalCallback(false) }}
            >
              <FontAwesomeIcon icon={faCancel} />
            </button>
            <button
              type="button"
              className="btn btn-outline-success mx-1"
              onClick={() => {
                submitCallback()
                modalCallback(false)
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  )
}

function Page({ params }) {
  const [checkoutIndexList, setCheckoutIndexList] = useState([]);
  const [currentModal, setCurrentModal] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [query, setQuery] = useState({});

  const [randShipFee, setRandShipFee] = useState(0);

  const currentPath = usePathname()
  const router = useRouter()

  async function removeItem(id, index) {
    let user_data = await getDocument('user-test', id)
    let user_cart_copy = user_data.cart

    user_cart_copy.splice(index, 1)
    user_data.cart = user_cart_copy

    editDocument('user-test', user_data, id)
    updateItems()
  }

  async function updateItems() {
    setLoading(true)
    const user_data = await getDocument('user-test', params.id)
    const cart_ref_array = user_data?.cart

    let cart_array = []

    for (let i = 0; i < cart_ref_array?.length; i++) {
      cart_array.push((await getDocumentFromRef(cart_ref_array[i])).data())
    }

    setItems(cart_array)
    setLoading(false)
  }

  function objectSum(obj, key) {
    let arr = []
    
    obj.forEach(element => {
      arr.push(element[key])
    });

    if (arr.length > 0) return arr.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue))
    else return 0
  }

  function itemChecklist(index, state) {
    let currentList = [...checkoutIndexList]

    if (state) currentList.push(index)
    else currentList = currentList.filter(item => item !== index)

    setCheckoutIndexList(currentList)
  }

  function filterChecklist(arr, search) {
    return arr.filter((item, idx) =>  {
      return search.includes(idx)
    })
  }

  useEffect(() => {
    if (checkoutIndexList.length > 0) setRandShipFee(Math.floor((Math.random() * 500) + 50))
    else setRandShipFee(0)

    localStorage.setItem('query', JSON.stringify(filterChecklist(items, checkoutIndexList)))
  }, [checkoutIndexList]);

  useEffect(() => {
    updateItems()
  }, []);

  if (loading) {
    return (
      <main className="d-flex justify-content-center align-items-center">
        <h1>Getting your hot items!</h1>
      </main>
    )
  }

  else {
    return (
      <main>
        <Container className='mb-5'>
          <Row>
            <Col md={9} sm={12}>
              {
                items.length === 0 ?
                  <>
                    <h1 className='text-danger'>You have no items</h1>
                  </>
                  :
                  <>
                    <h1>Shopping Cart</h1>
                    {
                      items.map((cart, idx) => (
                        <CartItem
                          data={cart}
                          itemIndex={idx}
                          user_id={params.id}
                          deleteCallback={[setConfirm, setCurrentModal]}
                          checkCallback={itemChecklist}
                        />
                      ))
                    }
                  </>
              }
            </Col>
            <Col md={3} sm={12} className='position-relative'>
              <div>
                <Card>
                  <CardBody>
                    <h4>Order Summary <small className='text-muted fw-normal'>| {checkoutIndexList.length} item(s)</small></h4>
                    <div>
                      <p className='my-2'>Item(s) Subtotal: ₱{
                        parseInt(objectSum(filterChecklist(items, checkoutIndexList), 'new_price'))
                      }</p>
                      <p className='my-2 text-muted'>Shipping fee: ₱{randShipFee}</p>
                      <p className='my-2 fw-bold'>Order Total: <br /> <h2>₱{parseInt((objectSum(filterChecklist(items, checkoutIndexList), 'new_price') + randShipFee))}</h2></p>
                    </div>
                  </CardBody>
                </Card>
                <button
                  type="button"
                  className="btn btn-success btn-lg my-3 w-100"
                  onClick={() => {
                    router.push(`checkout/receipt/${getRandomId()}`)
                  }}
                >
                  Proceed to checkout
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <ConfirmationModal
          submitCallback={() => { removeItem(currentModal?.id, currentModal?.index) }}
          modalCallback={setConfirm}
          isOpen={confirm}
          name={currentModal?.name}
        />
      </main>
    )
  }
}

export default Page