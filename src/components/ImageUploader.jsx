import React, { useState, useRef } from 'react'
import { Alert } from 'bootstrap'
import { Button, Card } from 'react-bootstrap'
import { useStorage } from '../core/services/StorageContext.js'

export default function ImageUploader(props) {
  const { uploadImage } = useStorage();
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const inputRef = useRef()
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const img = event?.target?.files[0]
    if (img) {
      setImage(img)
      console.log(img)
      setLoading(false)
    }
  }
  const clickInputHidden = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!image) { return }

    try {
      await uploadImage(image)

      setError('')
      setImage(null)
      setLoading(true)
      props.onImageUpload("Done");
      inputRef.current.value = null

    } catch (err) {
      setError('Please try again later')
      setLoading(true)
      inputRef.current.value = null
    }

  }

  return (
    <div style={{  alignItems: 'center', maxWidth:'100%' }}>
      {error && <Alert variant="danger">{error}</Alert>}
     
      <input type="file" className="d-none" ref={inputRef} onChange={handleChange} />

     <div className="text-center full-width">

     <Button 
      onClick={clickInputHidden}
      >Select Picture</Button>
      {image && <Card >
                <Card.Img
                  variant="top"
                  src={image.url}
                  width="100"
                  height="200"
                  style={{ objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title style={{ fontSize: 12 }}>{image.name}</Card.Title>
                  {/* <Card.Text>
                    description
                  </Card.Text> */}
                </Card.Body>
              </Card>}
             
              <Button
        className="w-25"
        type="submit"
        onClick={handleUpload}
       
        disabled={loading}
      >
        Upload Selected
      </Button>
     </div>
      
                

      
    </div >
  )
}
