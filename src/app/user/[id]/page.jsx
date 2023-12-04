'use client'

import { getDocument } from '@/app/scripts/database-functions'
import {
  Container,
  Button
} from 'reactstrap'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '@/app/scripts/firebase';

import { useRouter } from 'next/navigation';

async function Page({ params }) {
  const router = useRouter()
  const [signOut, loading, error] = useSignOut(auth);
  const user = await getDocument('user-test', params.id)
  

  function handleLogout() {
    signOut()
    router.push('/')
  }

  return (
    <main>
      <Container>
        <h1>
          Hello { user.fname }
        </h1>
        <p>
          You have reached the user page.
        </p>
        <h3>Current Actions:</h3>
        <Button color='danger' onClick={handleLogout}>
          Logout
        </Button>
      </Container>      
    </main>
  )
}

export default Page