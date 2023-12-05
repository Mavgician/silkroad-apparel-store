"use client";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  faFacebookF,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";

import { useSignInWithGoogle, useSignInWithFacebook } from "react-firebase-hooks/auth";
import {
  Button,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';

import { useRouter } from "next/navigation";


import logo from '@/app/favicon.ico'
import styles from '@/app/login.module.css'
import { auth } from "@/app/scripts/firebase";
import { docExists, editDocument } from "../scripts/database-functions";

function Login() {
  const router = useRouter()
  const [ signInWithGoogle, user_Google, loading_Google, error_Google ] = useSignInWithGoogle(auth)
  const [ signInWithFaceboook, user_Facebook, loading_Facebook, error_Facebook ] = useSignInWithFacebook(auth)
  
  async function GoogleAuth() {
    const user = (await signInWithGoogle()).user

    if (!await docExists('user-test', user.uid)) {
      await editDocument('user-test', {
        cart: [],
        contact: user.phoneNumber,
        email: user.email,
        fname: user.displayName,
        lname: user.displayName,
        id: user.uid,
        role: 'standard-user'
      }, user.uid)
    }

    router.back()
  }

  async function FacebookAuth() {
    const user = (await signInWithFaceboook())?.user

    if (!await docExists('user-test', user.uid)) {
      await editDocument('user-test', {
        cart: [],
        contact: user.phoneNumber,
        email: user.email,
        fname: user.displayName,
        lname: user.displayName,
        id: user.uid,
        role: 'standard user'
      }, user.uid)
    }

    router.back()
  }

  function backButton() {
    router.back()
  }

  return (
    <main className="p-0 position-relative">
      <div className="position-absolute top-0 left-0 p-4">
        <Button onClick={backButton}>
          Go back
        </Button>
      </div>
      <Row className="p-0 m-0 vh-100">
        <Col md={6} sm={12} className="d-flex justify-content-center align-items-center">
          <div className="w-25">
            <center>
              <h1 className='mb-4'>Sign In</h1>
              <Button className={`${styles.social} mx-1`} outline={true} color="primary" onClick={FacebookAuth}>
                <FontAwesomeIcon icon={faFacebookF} />
              </Button>
              <Button className={`${styles.social} mx-1`} outline={true} color="primary" onClick={GoogleAuth}>
                <FontAwesomeIcon icon={faGooglePlusG} />
              </Button>
              <p className="text-muted mt-3">or use your account</p>
              <FormGroup floating>
                <Input
                  placeholder="Email"
                  type="email"
                />
                <Label>
                  Email
                </Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  placeholder="Password"
                  type="password"
                />
                <Label>
                  Password
                </Label>
              </FormGroup>
              <a href="#">Forgot your password?</a>
              <div className="my-3">
                <Button block>
                  Sign In
                </Button>
              </div>
            </center>
          </div>
        </Col>
        <Col md={6} sm={12} className="bg-black d-flex justify-content-center align-items-center text-white">
          <div>
            <center className="my-4">
              <img src={logo.src} className="my-2 w-50" />
            </center>
            <h1>Hello, Friend!</h1>
            <p>Start a journey through the Silky Road of Clothes with us!</p>
            <Button block>
              Sign Up
            </Button>
          </div>
        </Col>
      </Row>
    </main>
  );
}

export default Login;
