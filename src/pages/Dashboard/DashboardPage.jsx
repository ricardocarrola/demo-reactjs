import React, { useState } from 'react'
import { useAuth } from '../../core/services/AuthContext.js';
import { Alert, Button, Card, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import ImageUploader from '../../components/ImageUploader.jsx';
import ImageGallery from '../../components/ImageGallery.jsx';

export default function DashboardPage() {
  const history = useHistory()
  const { logOut, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [force, setRefresh] = useState(true)

  const handleLogout = async () => {
    try {
      await logOut()
      history.push('/login')
      setError('')

    } catch (err) {
      setError('Please try again later')
    }
  }

  const imageWasUploaded = () =>{
    setRefresh(!force);
    console.log("FORCE", force);
  }

  return (
    <Container >

      <Card className="m-4">
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Logout</Button>
          </div>

        </Card.Body>

        <Card.Body>
          <h3 className="text-center mb-4">Add Image to Gallery</h3>
          <ImageUploader onImageUpload={imageWasUploaded} />
        </Card.Body>
      </Card>

      <ImageGallery reload={force}/>

    </Container>
  )
}
