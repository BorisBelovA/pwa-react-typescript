import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar, useTheme } from '@mui/material'
import styles from './Photos.module.scss'
import { type ChangeEvent, useEffect, useState } from 'react'
import { ImageCropper } from 'src/components/ImageCropper/ImageCropper'
import { appartmentQuestionnaireContext } from '../..'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { AppartmentsQuestionnaireRoutes } from 'models'

export const Photos = (): JSX.Element => {
  const { appartment, setAppartment, setPercent, setNextDisabled, setActive } = appartmentQuestionnaireContext()
  const [cropVisible, setCropVisible] = useState(false)
  const [image, setImage] = useState('')

  const theme = useTheme()

  useEffect(() => {
    setActive(AppartmentsQuestionnaireRoutes.PHOTOS)
    setNextDisabled(false)
  }, [])

  useEffect(() => {
    setPercent(appartment.photos.length > 0 ? 100 : 0, 100, AppartmentsQuestionnaireRoutes.PHOTOS)
  }, [appartment.photos])

  const addPhoto = (): void => {
    document.getElementById('photo-upload')?.click()
  }

  const addPhotoToAppartmentCollection = (photo: string): void => {
    setAppartment({
      ...appartment,
      photos: [
        ...appartment.photos,
        photo
      ]
    })
  }

  const removePhoto = (index: number): void => {
    const photos = appartment.photos.filter((p, idx) => idx !== index)
    setAppartment({
      ...appartment,
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

  const openCrop = (photo: File): void => {
    const reader = photoReader(photo)
    reader.onloadend = () => {
      setImage(reader.result as string)
      setCropVisible(true)
    }
  }

  const photoReader = (photo: File): FileReader => {
    const reader = new FileReader()
    reader.readAsDataURL(photo)
    return reader
  }

  return <>
    <Box className={styles.container}>
      <Button variant="outlined" onClick={addPhoto}>Add photos</Button>
      <Box className={styles.images_container}>
        <ImageList cols={3} gap={8}>
          {appartment.photos.map((photo, index) => {
            return <ImageListItem key={index} sx={{
              borderRadius: '16px',
              border: '1px solid gray',
              overflow: 'hidden'
            }}>
              <img src={photo} height='100px' loading="lazy"
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
                      ':hover': {
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
          addPhotoToAppartmentCollection(photo);
          (document.getElementById('photo-upload') as HTMLInputElement).value = ''
        }}
      />}

      <input id='photo-upload'
        className={styles.hiddenInput}
        type="file"
        accept='.jpeg,.jpg,.png'
        name=""
        onChange={handleFileChange}
      />
    </Box>
  </>
}
