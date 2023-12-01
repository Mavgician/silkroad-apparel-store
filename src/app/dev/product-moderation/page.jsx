'use client'

import { db } from '@/app/scripts/firebase.js'
import {
  collection,
  setDoc,
  doc,
  query,
  getDocs,
  deleteDoc,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  getDoc,
  startAt
} from 'firebase/firestore'

import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faEdit,
  faAdd,
  faRefresh,
  faCheck,
  faCancel,
  faArrowRight,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Form,
  Label,
  Input,
  Row,
  Col,
  Table,
  Container
} from 'reactstrap';

import { useFilePicker } from 'use-file-picker';
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
  ImageDimensionsValidator,
} from 'use-file-picker/validators';

let storage = getStorage()

function ProductSetting(props) {
  return (
    <>
      {
        props.data.map((object, idx) =>
          <tr key={object.id}>
            <td className="pl-4 col-2 text-muted"><span>{object.id}</span></td>
            <td><span className="col-1 text-muted">{object.product_name}</span></td>
            <td className='col-1 text-muted'>{object.images.length}</td>
            <td className='col-2 text-muted'>
              <div>
                <span className='fw-bold'>old price: </span>{object.old_price}
              </div>
              <div>
                <span className='fw-bold'>new price: </span>{object.new_price}
              </div>
            </td>
            <td className='col-2 text-muted'>
              <div><span className="fw-bold">Rating: </span>{object.rating}</div>
              <div><span className="fw-bold">Popularity: </span>{object.rating_count}</div>
            </td>
            <td className='col-2 text-muted'>
              <div>
                <span className='fw-bold'>Availability: </span>
                {object.extra_details.available.toString()}
              </div>
              <div>
                <span className='fw-bold'>Category: </span>{object.extra_details.category.type} - {object.extra_details.category.group}
              </div>
              <div>
                <span className='fw-bold'>Shipping Area: </span>{object.extra_details.shipping_area}
              </div>
              <div>
                <span className='fw-bold'>Shipping Fee: </span>{object.extra_details.shipping_fee}
              </div>
            </td>
            <td className='col-2'>
              <button
                type="button"
                className="btn btn-outline-info btn-circle btn-lg btn-circle me-2"
                onClick={
                  () => {
                    props.setEntry(object)
                    props.modalCallback(true)
                  }
                }
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                type="button"
                className="btn btn-outline-danger btn-circle btn-lg btn-circle me-2"
                onClick={() => props.deleteCallback(object.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        )
      }
    </>
  )
}

function ProductModal(
  {
    data,
    isOpen,
    modalCallback,
    submitCallback,
    modalHeader
  }
) {

  // Form States
  const [isEditUUID, setIsEditUUID] = useState(true);

  // Input states
  const [productName, setProductName] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [rating, setRating] = useState('');
  const [popularity, setPopularity] = useState('standard user');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  const [available, setAvailable] = useState(false);
  const [group, setGroup] = useState('');
  const [type, setType] = useState('');
  const [shipArea, setShipArea] = useState(0);
  const [shipFee, setShipFee] = useState(0);

  const [imageFiles, setImageFiles] = useState([]);

  const { openFilePicker, filesContent, loading, errors } = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 10 }),
      new FileTypeValidator(['jpg', 'png']),
      new FileSizeValidator({ maxFileSize: 50 * 1024 * 1024 /* 50 MB */ }),
      new ImageDimensionsValidator({
        maxHeight: 4000, // in pixels
        maxWidth: 4000,
        minHeight: 0,
        minWidth: 8,
      }),
    ],
  });

  // Set form data when data is not undefined, otherwise, set form data to default.
  useEffect(() => {
    setId(doc(collection(db, 'product-test')).id)
    setProductName('')
    setOldPrice(0)
    setNewPrice(0)
    setRating(0)
    setPopularity(0)
    setDescription('')
    setAvailable(false)
    setGroup('Men')
    setType('Bottoms')
    setShipArea('Everywhere')
    setShipFee(0)
    setImageFiles([])

    if (data != undefined) {
      setId(data.id)
      setProductName(data.product_name)
      setOldPrice(data.old_price)
      setNewPrice(data.new_price)
      setRating(data.rating)
      setPopularity(data.rating_count)
      setDescription(data.description)
      setAvailable(data.extra_details.available)
      setGroup(data.extra_details.category.group)
      setType(data.extra_details.category.type)
      setShipArea(data.extra_details.shipping_area)
      setShipFee(data.extra_details.shipping_fee)
      setImageFiles(data.images)
    }
  }, [isOpen]);

  useEffect(() => {
    setImageFiles(filesContent)
  });

  async function uploadFile(name, content) {
    let snapshot = await uploadString(ref(ref(storage, id), name), content, 'data_url')
    
    return snapshot
  }

  async function handleSubmit() {
    let download_urls = []

    for (let i = 0; i < imageFiles.length; i++) {
      let snapshot = await uploadFile(imageFiles[i].name, imageFiles[i].content)
      download_urls.push(await getDownloadURL(snapshot.ref))
    }

    let submit_data = {
      product_name: productName,
      old_price: oldPrice,
      new_price: newPrice,
      description: description,
      rating: rating,
      rating_count: popularity,
      images: download_urls,
      id: id,
      extra_details: {
        category: {
          type: type,
          group: group
        },
        shipping_area: shipArea,
        shipping_fee: shipFee,
        available: available
      }
    }

    modalCallback(false)
    submitCallback(submit_data)
  }

  function handleID(e) {
    setId(e.target.value)
  }

  function handleProdName(e) {
    setProductName(e.target.value)
  }

  function handleOldPrice(e) {
    setOldPrice(e.target.value)
  }

  function handleNewPrice(e) {
    setNewPrice(e.target.value)
  }

  function handleRating(e) {
    setRating(e.target.value)
  }

  function handlePopularity(e) {
    setPopularity(e.target.value)
  }

  function handleDescription(e) {
    setDescription(e.target.value)
  }

  function handleAvailable(e) {
    setAvailable(e.target.checked)
  }

  function handleShipArea(e) {
    setShipArea(e.target.value)
  }

  function handleShipFee(e) {
    setShipFee(e.target.value)
  }

  function handleType(e) {
    setType(e.target.value)
  }

  function handleGroup(e) {
    setGroup(e.target.value)
  }

  return (
    <Modal toggle={() => modalCallback(!isOpen)} isOpen={isOpen} unmountOnClose={true} centered={true} size='xl'>
      <ModalBody className='p-0'>
        <Card className='bg-light shadow border-0'>
          <CardHeader className=" bg-white py-3 px-4">
            <div className="text-muted mb-3">
              <big>{modalHeader}</big>
            </div>
            <Form>
              <FormGroup row>
                <Label>
                  ID
                  <button
                    type="button"
                    className="btn btn-sm mx-2 p-0"
                    onClick={() => setIsEditUUID(!isEditUUID)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Label>
                <div>
                  <Input
                    placeholder="0"
                    value={id}
                    disabled={isEditUUID}
                    onChange={handleID}
                  />
                </div>
              </FormGroup>
              <Row>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      placeholder="Product Name"
                      value={productName}
                      onChange={handleProdName}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                        <Label>Old Price</Label>
                        <Input
                          placeholder="Old Price"
                          type='number'
                          value={oldPrice}
                          onChange={handleOldPrice}
                        />
                      </Col>
                      <Col md={6}>
                        <Label>New Price</Label>
                        <Input
                          placeholder="New Price"
                          type='number'
                          value={newPrice}
                          onChange={handleNewPrice}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                        <Label>Rating</Label>
                        <Input
                          placeholder="Rating"
                          type='number'
                          max={5}
                          value={rating}
                          onChange={handleRating}
                        />
                      </Col>
                      <Col md={6}>
                        <Label>Popularity</Label>
                        <Input
                          placeholder="Popularity"
                          type='number'
                          value={popularity}
                          onChange={handlePopularity}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label>Description</Label>
                    <Col>
                      <Input
                        placeholder="description"
                        type="textarea"
                        value={description}
                        onChange={handleDescription}
                      />
                    </Col>
                  </FormGroup>
                </Col >
                <Col sm={12} md={6}>
                  <FormGroup>
                    <Row>
                      <Col md={6}>
                        <div>
                          <Label>Group</Label>
                          <Input
                            type="select"
                            onChange={handleGroup}
                            value={group}
                          >
                            <option>
                              Men
                            </option>
                            <option>
                              Women
                            </option>
                            <option>
                              Kids
                            </option>
                          </Input>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div>
                          <Label>Type</Label>
                          <Input
                            type="select"
                            onChange={handleType}
                            value={type}
                          >
                            <option>
                              Bottoms
                            </option>
                            <option>
                              Tops
                            </option>
                            <option>
                              Underwear
                            </option>
                            <option>
                              Shirts
                            </option>
                            <option>
                              Pants
                            </option>
                            <option>
                              Outerwear
                            </option>
                            <option>
                              Inner
                            </option>
                          </Input>
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label>Shipping Area</Label>
                      <Input
                        type="select"
                        onChange={handleShipArea}
                        value={shipArea}
                      >
                        <option>
                          Everywhere
                        </option>
                        <option>
                          Asia
                        </option>
                        <option>
                          North America
                        </option>
                        <option>
                          South America
                        </option>
                        <option>
                          Europe
                        </option>
                      </Input>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>Shipping Fee</Label>
                    <Input
                      placeholder="Shipping Fee"
                      type='number'
                      value={shipFee}
                      onChange={handleShipFee}
                    />
                  </FormGroup>
                  <FormGroup switch>
                    <Input type="switch" role="switch" onChange={handleAvailable} checked={available}/>
                    <Label check>Available</Label>
                  </FormGroup>
                </Col>
              </Row>
              <div>
                <div>
                  <big>Images</big>
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm mx-1"
                    onClick={openFilePicker}
                  >
                    <FontAwesomeIcon icon={faAdd} />
                  </button>
                </div>
                <div>
                  <small>Upload images for product gallery and thumbnails. Images must be JPG or PNG, under 50mb, and with a resolution under 4000x4000.</small>
                </div>
              </div>
              <Row className='pt-3'>
                {loading ? <p>Loading the image/s...</p> : imageFiles.map(data => <Col md={6} lg={3} xl={2}><img width={'100%'} src={data.content} /></Col>)}
                {errors.length ? <p>Error!</p> : null}
              </Row>
            </Form>
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
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </CardBody>
        </Card>
      </ModalBody>
    </Modal>
  )
}

function ConfirmationModal({
  submitCallback,
  modalCallback,
  isOpen,
  id
}) {
  return (
    <Modal toggle={() => modalCallback(!isOpen)} isOpen={isOpen} unmountOnClose={true} centered={true}>
      <ModalBody className='p-0'>
        <Card className='bg-light shadow border-0'>
          <CardHeader className=" bg-white py-3 px-4">
            <div className="text-danger mb-3 d-block fw-bold">
              <big>Are you sure?</big>
            </div>
            <p>You are deleting <b>{id}</b>.</p>
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

function Page() {
  // Page States
  const [productList, setProductList] = useState([]);
  const [entryEditObject, setEntryEditObject] = useState(undefined);
  const [entryDeleteObject, setEntryDeleteObject] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [totalProductCount, setTotalProductCount] = useState(0);
  const [currentProductCount, setCurrentProductCount] = useState(0);

  // Modal States
  const [isModalAddOpen, setisModalAddOpen] = useState(false);
  const [ismodalEditOpen, setisModalEditOpen] = useState(false);
  const [isConfirmOpen, setisConfirmOpen] = useState(false);

  // Databse stuff
  const collectionRef = collection(db, 'product-test');

  // Table Pagination for users
  const [lastVisibleDoc, setLastVisibleDoc] = useState(undefined);
  const [firstVisibleDoc, setFirstVisibleDoc] = useState(undefined);

  async function getCollection() {
    const querySnap = await getDocs(query(collectionRef, orderBy('id'), limit(10)))
    let totalUserCount = (await getCountFromServer(collectionRef)).data().count
    let data = []

    querySnap.docs.forEach(
      (doc, idx, arr) => {
        if (idx === arr.length - 1) setLastVisibleDoc(doc)
        if (idx === 0) setFirstVisibleDoc(doc)

        data.push(doc.data())
      }
    )

    setTotalProductCount(totalUserCount)
    setCurrentProductCount(querySnap.docs.length);
    setProductList(data)
    setIsLoading(false)
  }

  async function getNextProducts() {
    const querySnap = await getDocs(query(collectionRef, orderBy('id'), startAfter(lastVisibleDoc), limit(10)))
    let data = []

    querySnap.docs.forEach(
      (doc, idx, arr) => {
        if (idx === arr.length - 1) setLastVisibleDoc(doc)

        data.push(doc.data())
      }
    )

    setFirstVisibleDoc(await getDoc(doc(collectionRef, productList[0].id)))
    setCurrentProductCount(currentProductCount + querySnap.docs.length);
    setProductList(data)
  }

  async function getPreviousProducts() {
    const querySnap = await getDocs(query(collectionRef, orderBy('id'), startAt(firstVisibleDoc), limit(10)))
    let data = []

    querySnap.docs.forEach(
      (doc, idx, arr) => {
        if (idx === arr.length - 1) setLastVisibleDoc(doc)

        data.push(doc.data())
      }
    )

    setCurrentProductCount(currentProductCount - (currentProductCount - querySnap.docs.length));
    setProductList(data)
  }

  async function addProduct(data) {
    await setDoc(doc(collectionRef, data.id), {
      product_name: data.product_name,
      old_price: data.old_price,
      new_price: data.new_price,
      description: data.description,
      rating: data.rating,
      rating_count: data.rating_count,
      images: data.images,
      id: data.id,
      extra_details: {
        category: {
          type: data.extra_details.category.type,
          group: data.extra_details.category.group
        },
        shipping_area: data.extra_details.shipping_area,
        shipping_fee: data.extra_details.shipping_fee,
        available: data.extra_details.available
      }
    })
    getCollection()
  }

  async function editProduct(data) {
    await setDoc(doc(collectionRef, String(data.id)), data)
    getCollection()
  }

  async function deleteProduct(id) {
    await deleteDoc(doc(collectionRef, String(id)))
    getCollection()
  }

  useEffect(() => {
    getCollection();
  }, [])

  if (isLoading) {
    return (
      <main className='d-flex justify-content-center align-items-center'>
        <h1>Fetching Product list...</h1>
      </main>
    )
  }
  else return (
    <main>
      <Container>
        <Card>
          <CardHeader className="d-flex align-items-center">
            <CardTitle className='m-0 me-1'>
              <h5 className='m-0'>Product Management</h5>
            </CardTitle>
            <button
              type="button"
              className="btn btn-outline-success btn-sm mx-1"
              onClick={() => setisModalAddOpen(!isModalAddOpen)}
            >
              <FontAwesomeIcon icon={faAdd} />
            </button>
            <button
              type="button"
              className="btn btn-outline-info btn-sm mx-1"
              onClick={getCollection}
            >
              <FontAwesomeIcon icon={faRefresh} />
            </button>
            <small className='text-muted me-1 ms-auto'>Showing {currentProductCount} of {totalProductCount}</small>
            <button type="button" className="btn btn-sm" onClick={getPreviousProducts}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button type="button" className="btn btn-sm" onClick={getNextProducts}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </CardHeader>
          <CardBody>
            <div className="table-responsive">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th className='col-2'>
                      UUID
                    </th>
                    <th className='col-1'>
                      Name
                    </th>
                    <th className='col-1'>
                      Image URLs
                    </th>
                    <th className='col-2'>
                      Price
                    </th>
                    <th className='col-2'>
                      Rating
                    </th>
                    <th className='col-2'>
                      Extra Details
                    </th>
                    <th className='col-2'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ProductSetting
                    data={productList}
                    setEntry={setEntryEditObject}
                    deleteCallback={id => {
                      setisConfirmOpen(true)
                      setEntryDeleteObject(id)
                    }}
                    modalCallback={setisModalEditOpen}
                  />
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Container>
      <ProductModal
        submitCallback={addProduct}
        modalHeader='Add a new user'
        modalCallback={setisModalAddOpen}
        isOpen={isModalAddOpen}
      />
      <ProductModal
        data={entryEditObject}
        submitCallback={editProduct}
        modalHeader={'Edit user'}
        modalCallback={setisModalEditOpen}
        isOpen={ismodalEditOpen}
      />
      <ConfirmationModal
        submitCallback={() => { deleteProduct(entryDeleteObject) }}
        modalCallback={setisConfirmOpen}
        isOpen={isConfirmOpen}
        id={entryDeleteObject}
      />
    </main>
  )
}

export default Page