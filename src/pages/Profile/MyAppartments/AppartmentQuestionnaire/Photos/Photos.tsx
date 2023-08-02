import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar, useTheme } from '@mui/material'
import styles from './Photos.module.scss'
import { type ChangeEvent, useEffect, useState } from 'react'
import { ImageCropper } from 'src/components/ImageCropper/ImageCropper'
import { apartmentQuestionnaireContext } from '../..'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { ApartmentsQuestionnaireRoutes } from 'models'
import { imageTypes } from 'src/utils/constants'
import heic2any from 'heic2any'
import { useMainContext } from 'src/layouts/Main/MainLayout'

export const Photos = (): JSX.Element => {
  const { apartment, setApartment, setPercent, setNextDisabled, setActive } = apartmentQuestionnaireContext()
  const [cropVisible, setCropVisible] = useState(false)
  const [image, setImage] = useState('')
  const {
    setBackdropVisible,
    setBackdropMessage,
    setMessage
  } = useMainContext()

  const theme = useTheme()

  useEffect(() => {
    setActive(ApartmentsQuestionnaireRoutes.PHOTOS)
    setNextDisabled(false)
  }, [])

  useEffect(() => {
    setPercent(apartment.photos.length > 0 ? 100 : 0, 100, ApartmentsQuestionnaireRoutes.PHOTOS)
  }, [apartment.photos])

  const addPhoto = (): void => {
    document.getElementById('photo-upload')?.click()
  }

  const addPhotoToApartmentCollection = (photo: string): void => {
    setApartment({
      ...apartment,
      photos: [
        ...apartment.photos,
        photo
      ]
    })
  }

  const removePhoto = (index: number): void => {
    const photos = apartment.photos.filter((p, idx) => idx !== index)
    setApartment({
      ...apartment,
      photos
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if ((e.target.files != null)) {
      const oversize = (e.target.files[0].size / (1024 * 1024)) > 20
      if (!oversize) {
        openCrop(e.target.files[0])
      }
    }
  }

  const openCrop = async (photo: File): Promise<void> => {
    const reader = await photoReader(photo)
    reader.onloadend = () => {
      setImage(reader.result as string)
      setCropVisible(true)
    }
  }

  const photoReader = async (photo: File): Promise<FileReader> => {
    const extension = photo.name.match(/\.[0-9a-z]+$/i)?.[0].toLowerCase()
    if (extension === '.heic') {
      setBackdropVisible(true)
      setBackdropMessage('Converting iOs format')
      const reader = await heic2any({
        blob: photo,
        toType: 'image/jpeg',
        quality: 0.3
      })
        .then((result) => {
          const file = new File([result as Blob], 'image.jpg')
          const reader = new FileReader()
          reader.readAsDataURL(file)
          return reader
        }).catch((e) => {
          setMessage({
            visible: true,
            severity: 'error',
            text: 'Can\'t use this photo, please try another one'
          })
          setBackdropVisible(false)
          console.log(e)
        })
      setBackdropVisible(false)
      return reader as FileReader
    }
    const reader = new FileReader()
    reader.readAsDataURL(photo)
    return reader
  }

  return <>
    <Box className={styles.container}>
      <Button variant="outlined" onClick={addPhoto}>Add photos</Button>
      <Box className={styles.images_container}>
        <ImageList cols={2} gap={8} rowHeight={100}>
          {apartment.photos.map((photo, index) => {
            return <ImageListItem key={index} sx={{
              borderRadius: '16px',
              border: '1px solid gray',
              overflow: 'hidden'
            }}>
              <img src={photo} loading="lazy"
              />
              <ImageListItemBar position="bottom"
                sx={{
                  background: 'transparent',
                  padding: '4px'
                }}
                actionIcon={
                  <IconButton className={styles.action_button}
                    onClick={() => { removePhoto(index) }}
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.secondary.main
                      }
                    }}><CancelOutlinedIcon /></IconButton>
                }
              >

              </ImageListItemBar>
            </ImageListItem>
          })}
        </ImageList>
      </Box>

      {cropVisible && <ImageCropper title='Select photo'
        image={image}
        acceptButtonText='Accept'
        shape='wide-rect'
        acceptImage={photo => {
          setCropVisible(false)
          addPhotoToApartmentCollection(photo);
          (document.getElementById('photo-upload') as HTMLInputElement).value = ''
        }}
      />}

      <input id='photo-upload'
        className={styles.hiddenInput}
        type="file"
        accept={imageTypes}
        name=""
        onChange={handleFileChange}
      />
    </Box>
  </>
}
