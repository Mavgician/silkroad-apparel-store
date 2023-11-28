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

function UserSetting(props) {
  return (
    <>
      {
        props.data.map((object, idx) =>
          <tr key={object.id} className='align-middle'>
            <td className="pl-4"><span className="text-muted">{object.id}</span></td>
            <td><span className="text-muted">{object.lname}</span></td>
            <td><span className="text-muted">{object.fname}</span></td>
            <td><span className="text-muted">{object.contact}</span></td>
            <td><span className="text-muted">{object.email}</span></td>
            <td><span className="text-muted">{object.role}</span></td>
            <td className=''>
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

function UserModal(
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
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('standard user');
  const [id, setId] = useState('');

  // Set form data when data is not undefined, otherwise, set form data to default.
  useEffect(() => {
    setId(doc(collection(db, 'user-test')).id)
    setFname('')
    setLname('')
    setEmail('')
    setContact('')
    setRole('standard user')

    if (data != undefined) {
      setFname(data.fname)
      setLname(data.lname)
      setEmail(data.email)
      setContact(data.contact)
      setRole(data.role)
      setId(data.id)
    }
  }, [isOpen]);

  function handleSubmit() {
    let submit_data = {
      id: id,
      email: email,
      contact: contact,
      fname: fname,
      lname: lname,
      role: role
    }

    modalCallback(false)
    submitCallback(submit_data)
  }

  function handleFname(e) {
    setFname(e.target.value)
  }

  function handleLname(e) {
    setLname(e.target.value)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handleContact(e) {
    setContact(e.target.value)
  }

  function handleID(e) {
    setId(e.target.value)
  }

  function handleRole(e) {
    setRole(e.target.value)
  }

  return (
    <Modal toggle={() => modalCallback(!isOpen)} isOpen={isOpen} unmountOnClose={true} centered={true}>
      <ModalBody className='p-0'>
        <Card className='bg-light shadow border-0'>
          <CardHeader className=" bg-white py-3 px-4">
            <div className="text-muted mb-3">
              <big>{modalHeader}</big>
            </div>
            <Form>
              <FormGroup row>
                <Label for="uniqueUserID" className='d-flex'>
                  ID
                  <button
                    type="button"
                    className="btn btn-sm mx-2 p-0"
                    onClick={() => setIsEditUUID(!isEditUUID)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Label>
                <Col>
                  <Input
                    id="uniqueUserID"
                    name="UUID"
                    placeholder="0"
                    value={id}
                    disabled={isEditUUID}
                    onChange={handleID}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Row sm={1}>
                  <Col md={4} className='mb-sm-3 my-md-0'>
                    <Label
                      for="newUserLName"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="newUserLName"
                      name="FName"
                      placeholder="Last name"
                      value={lname}
                      onChange={handleLname}
                    />
                  </Col>
                  <Col md={8}>
                    <Label
                      for="newUserFName"
                    >
                      First Name
                    </Label>
                    <Input
                      id="newUserFName"
                      name="FName"
                      placeholder="First Name"
                      value={fname}
                      onChange={handleFname}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup row>
                <Label for="userEmail">
                  Email
                </Label>
                <Col>
                  <Input
                    id="userEmail"
                    name="email"
                    placeholder="john.doe@hotmail.com"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="userContact">
                  Contact
                </Label>
                <Col>
                  <Input
                    id="userContact"
                    name="email"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={handleContact}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="userRole">
                  Role
                </Label>
                <div>
                  <Input
                    id="userRole"
                    name="role"
                    type="select"
                    onChange={handleRole}
                    value={role}
                  >
                    <option>
                      standard user
                    </option>
                    <option>
                      merchant user
                    </option>
                    <option>
                      brand user
                    </option>
                    <option>
                      moderator
                    </option>
                    <option>
                      admin
                    </option>
                  </Input>
                </div>
              </FormGroup>
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
  const [userList, setUserList] = useState([]);
  const [entryEditObject, setEntryEditObject] = useState(undefined);
  const [entryDeleteObject, setEntryDeleteObject] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [totalUserCount, setTotalUserCount] = useState(0);
  const [currentUserCount, setCurrentUserCount] = useState(0);

  // Modal States
  const [isModalAddOpen, setisModalAddOpen] = useState(false);
  const [ismodalEditOpen, setisModalEditOpen] = useState(false);
  const [isConfirmOpen, setisConfirmOpen] = useState(false);

  // Databse stuff
  const collectionRef = collection(db, 'user-test');

  // Table Pagination for users
  const [lastVisibleDoc, setLastVisibleDoc] = useState(undefined);
  const [firstVisibleDoc, setFirstVisibleDoc] = useState(undefined);

  async function getUsers() {
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

    /* let testData = [
      {
        id: '1asfa1asvmjkdngaj',
        fname: 'teafsa',
        lname: 'teasfaaazxca',
        email: 'email@email.com',
        contact: '09999999999',
        role: 'standard user'
      }
    ] */

    setTotalUserCount(totalUserCount)
    setCurrentUserCount(querySnap.docs.length);
    setUserList(data)
    setIsLoading(false)
  }

  async function getNextUsers() {
    const querySnap = await getDocs(query(collectionRef, orderBy('id'), startAfter(lastVisibleDoc), limit(10)))
    let data = []

    querySnap.docs.forEach(
      (doc, idx, arr) => {
        if (idx === arr.length - 1) setLastVisibleDoc(doc)

        data.push(doc.data())
      }
    )

    setFirstVisibleDoc(await getDoc(doc(collectionRef, userList[0].id)))
    setCurrentUserCount(currentUserCount + querySnap.docs.length);
    setUserList(data)
  }

  async function getPreviousUsers() {
    const querySnap = await getDocs(query(collectionRef, orderBy('id'), startAt(firstVisibleDoc), limit(10)))
    let data = []

    console.log(firstVisibleDoc.data());

    querySnap.docs.forEach(
      (doc, idx, arr) => {
        if (idx === arr.length - 1) setLastVisibleDoc(doc)

        data.push(doc.data())
      }
    )

    setCurrentUserCount(currentUserCount - (currentUserCount - querySnap.docs.length));
    setUserList(data)
  }

  async function addUser(data) {
    await setDoc(doc(collectionRef, data.id), {
      id: data.id,
      email: data.email,
      contact: data.contact,
      fname: data.fname,
      lname: data.lname,
      role: data.role
    })
    getUsers()
  }

  async function editUser(data) {
    await setDoc(doc(collectionRef, String(data.id)), data)
    getUsers()
  }

  async function deleteUser(id) {
    await deleteDoc(doc(collectionRef, String(id)))
    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, [])

  if (isLoading) {
    return (
      <main className='d-flex justify-content-center align-items-center'>
        <h1>Fetching user list...</h1>
      </main>
    )
  }
  else return (
    <main>
      <Container>
        <Card>
          <CardHeader className="d-flex align-items-center">
            <CardTitle className='m-0 me-1'>
              <h5 className='m-0'>User Management</h5>
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
              onClick={getUsers}
            >
              <FontAwesomeIcon icon={faRefresh} />
            </button>
            <small className='text-muted me-1 ms-auto'>Showing {currentUserCount} of {totalUserCount}</small>
            <button type="button" className="btn btn-sm" onClick={getPreviousUsers}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button type="button" className="btn btn-sm" onClick={getNextUsers}>
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
                      Last Name
                    </th>
                    <th className='col-2'>
                      First Name
                    </th>
                    <th className='col-2'>
                      Contact Number
                    </th>
                    <th className='col-2'>
                      Email
                    </th>
                    <th>
                      Role
                    </th>
                    <th>
                      Manage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <UserSetting
                    data={userList}
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
      <UserModal
        submitCallback={addUser}
        modalHeader='Add a new user'
        modalCallback={setisModalAddOpen}
        isOpen={isModalAddOpen}
      />
      <UserModal
        data={entryEditObject}
        submitCallback={editUser}
        modalHeader={'Edit user'}
        modalCallback={setisModalEditOpen}
        isOpen={ismodalEditOpen}
      />
      <ConfirmationModal
        submitCallback={() => { deleteUser(entryDeleteObject) }}
        modalCallback={setisConfirmOpen}
        isOpen={isConfirmOpen}
        id={entryDeleteObject}
      />
    </main>
  )
}

export default Page