import React, { useRef, useState } from 'react';
import { Alert, Card, Form, Button, Container } from 'react-bootstrap';
import { useAuth } from '../../core/services/AuthContext.js';
import { Link, useHistory } from 'react-router-dom';


export default function RegisterPage() {
  const history = useHistory()
  const { signUp } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (passwordRef.current.value !== passwordConfRef.current.value) {
      return setError('Passwords must match')
    }

    try {
      setLoading(true)
      setError('')
      await signUp(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch (err) {
      setError(err.message)
    }

    setLoading(false)
  }


  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: 400 }}>

        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group id="email" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              {/* Password */}
              <Form.Group id="password" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              {/* Password Confirmation */}
              <Form.Group id="passwordConf" >
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" ref={passwordConfRef} required />
              </Form.Group>

              <Button className="w-100 mt-4" type="submit" disabled={loading}>
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/login" variant="body2">
            Already have an account? LogIn
          </Link>
        </div>

      </div>
    </Container>
  );
}
