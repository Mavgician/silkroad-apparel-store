import { auth, db } from '@/app/scripts/firebase.js'
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
  startAt,
  where,
  FieldPath
} from 'firebase/firestore'

async function getCollection(collectionRef) {
  /* await new Promise(resolve => setTimeout(resolve, 1000)) */

  const querySnap = await getDocs(query(collection(db, collectionRef), orderBy('id')))
  let data = []

  querySnap.docs.forEach(
    (doc) => data.push(doc.data())
  )

  return data
}

async function getCollectionFiltered(collectionRef, filter, search_limit = 5, type = 'type') {
  /* await new Promise(resolve => setTimeout(resolve, 1000)) */

  const querySnap = await getDocs(
    query(
      collection(db, collectionRef),
      orderBy('id'),
      where(
        new FieldPath('extra_details', 'category', type),
        '==',
        filter
      ),
      limit(search_limit)
    )
  )

  let data = []

  querySnap.docs.forEach(
    (doc) => data.push(doc.data())
  )

  return data
}

async function getDocument(collectionRef, id) {
  /* await new Promise(resolve => setTimeout(resolve, 1000)) */

  let snapshot = await getDoc(doc(collection(db, collectionRef), id));
  let data = snapshot.data();

  return data
}

async function getDocumentFromRef(ref) {
  return await getDoc(ref)
}

function getRefFromId(collectionRef, id) {
  return doc(collection(db, collectionRef), String(id))
}

function getCurrentUser() {
  return auth.currentUser
}

async function editDocument(collectionRef, data, id) {
  return await setDoc(doc(collection(db, collectionRef), String(id)), data)
}

async function docExists(collectionRef, id) {
  let snapshot = await getDoc(doc(collection(db, collectionRef), id));

  return snapshot.exists()
}

async function deleteDocument(collectionRef, id) {
  return await deleteDoc(doc(collection(db, collectionRef), String(id)))
}

export { getCollection, getCollectionFiltered, getDocument, getCurrentUser, getDocumentFromRef, getRefFromId, editDocument, deleteDocument, docExists }