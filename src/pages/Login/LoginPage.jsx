import React, { useRef, useState } from 'react';
import { Alert, Card, Form, Button, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../core/services/AuthContext.js';

export default function LoginPage() {
  const history = useHistory()
  const { logIn } = useAuth()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')
      await logIn(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch (err) {
      setError(err)
    }

    setLoading(false)
  }


  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: 400 }}>
        {/* {getImages} */}
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
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

              <Button className="w-100 mt-4" type="submit" disabled={loading}>
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/register" variant="body2">
            Already have an account? SignUp
          </Link>
        </div>

      </div>
    </Container>
  );
}
