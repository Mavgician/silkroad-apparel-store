import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/scripts/firebase';

import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

import logo from '@/app/favicon.ico'
import Image from 'next/image';

function Navigationbar() {
  const [user, loading, error] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen)
  }

  return (
    <Navbar expand='md' color='dark' dark fixed='top'>
      <NavbarBrand href='/' className='d-flex align-items-center'>
        <Image src={logo.src} width="40" height="40" />
        <small className='mx-2'><b>Silkroad</b></small>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='text-uppercase fw-bold' navbar>
          <NavItem>
            <NavLink href='/shopping/women'>Women</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/shopping/men'>Men</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/shopping/kids'>Kids</NavLink>
          </NavItem>
        </Nav>
        <Nav className='ms-auto' navbar>
          {
            loading ?
              null
              :
              <>
                <NavItem className='mx-3'>
                  <NavLink href={user ? `/shopping/cart/${user?.uid}` : '/login'}>
                    <FontAwesomeIcon icon={faCartShopping} className='fa-lg' />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href={user ? `/user/${user?.uid}` : '/login'}>
                    <FontAwesomeIcon icon={faUser} className='fa-lg' />
                  </NavLink>
                </NavItem>
              </>
          }
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export { Navigationbar }