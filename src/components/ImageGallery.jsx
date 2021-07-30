import React, { useEffect, useState } from 'react'
import { Alert, Card, Container, Row, Col, Spinner } from 'react-bootstrap'
import { useStorage } from '../core/services/StorageContext.js'

export default function ImageGallery(props) {
  const { getImages } = useStorage();
  const [images, setImages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    try {

      console.log("Reloading Component!")
      setLoading(true);
      getImages().then(imgList => {
        setImages(imgList)
        setLoading(false)
      })
    } catch (err) {
      setError('Unable to load Gallery')
      console.log('Error', err)
    }
  }, [props.reload])

  return (
    <Container style={{ maxWidth: '100%' }}>

      <Card className="m-4" style={{ padding: 40 }}>
        <Card.Body>
          <h2 className="text-center mb-4">Gallery</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
        </Card.Body>
        {loading && <div className='text-center'><Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner></div>}
        <Row xs={4} md={4} className="g-4">
         
          {!loading && images.map((el, index) => (
            <Col key={index}>
              <Card >
               
                <Card.Body>
                  <Card.Title style={{ fontSize: 12 }}>{el.name}</Card.Title>
                  {/* <Card.Text>
                    description
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Card>

    </Container>
  )
}
