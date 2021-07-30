import React, { useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { storage as fb_str } from './firebase'
import { v4 as uuidv4 } from 'uuid';

const StorageContext = React.createContext()

export function useStorage() {
  return useContext(StorageContext)
}

export default function StorageProvider({ children }) {
  const [storage, setStorageRef] = useState()
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  function getImages() {
    const listRef = storage.ref().child(`images/${currentUser.uid}`)
    return new Promise((resolve) => {

      listRef.listAll().then(async res => {
        const prmList = []

        res.items.forEach(el => {
          const imgPrm = storage.ref()
            .child(el.fullPath)
            .getDownloadURL()

          prmList.push(imgPrm)
        })

        Promise.all(prmList).then(list => {
          const resultingList = list.map((e, i) => {
            const item = res.items[i]
            return {
              name: item.name,
              fullPath: item.fullPath,
              bucket: item.bucket,
              url: e,
            }
          })

          resolve(resultingList)
        })
      })
    })
  }

  function getImage() {
    return
  }

  function uploadImage(image) {
    const filename = uuidv4() + (image?.name ? image.name.split(".")[1] : ".jpg")
    const uploadTask = storage.ref(`images/${currentUser.uid}/${filename}`).put(image)
    return uploadTask.on(
      'state_change',
      null,
      error => {
        console.log('este :: .', error);
      },
      () => storage
        .ref(`images/${currentUser.uid}`)
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
        }
        )

    )
  }

  useEffect(() => {
    setStorageRef(fb_str)
    setLoading(false)
  }, [])

  const value = {
    getImages,
    getImage,
    uploadImage,
  }

  return (
    <StorageContext.Provider value={value}>
      {!loading && children}
    </StorageContext.Provider>
  )
}
