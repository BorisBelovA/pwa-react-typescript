import { Button } from '@mui/material'
import { useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { getUrl } from './utils'
import styles from './ImageCropper.module.scss'

type Shapes = 'round' | 'high-rect' | 'wide-rect'

const shapesAspects: Record<Shapes, number> = {
  round: 1,
  'high-rect': 3 / 5,
  'wide-rect': 16 / 10
}
export interface ImageCropperProps {
  image: string
  title: string
  acceptButtonText: string
  shape: Shapes
  acceptImage: (photo: string) => void
}

export const ImageCropper = ({
  image,
  acceptImage,
  title,
  acceptButtonText,
  shape
}: ImageCropperProps): JSX.Element => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [area, setArea] = useState<Area | null>(null)

  const applyAreaSelection = (): void => {
    if (area === null) {
      return
    }

    void (async () => {
      const str = await getUrl(image, area)
      if (str !== undefined) {
        acceptImage(str)
        resetCropSettings()
      }
    })()
  }

  const resetCropSettings = (): void => {
    setArea(null)
    setX(0)
    setY(0)
    setZoom(1)
  }

  return <div className={styles.cropWrapper}>
    <h3 className={styles.title}>{title}</h3>
    <Cropper
      image={image}
      crop={{ x, y }}
      zoom={zoom}
      aspect={shapesAspects[shape]}
      cropShape={shape === 'round' ? 'round' : 'rect'}
      showGrid={true}
      onCropChange={({ x, y }) => { setX(x); setY(y) }}
      onCropComplete={(e, i) => { setArea(i) }}
      onZoomChange={(zoom) => { setZoom(zoom) }}
    />
    <Button variant="contained" className={styles.acceptCropBtn} onClick={applyAreaSelection}>
      {acceptButtonText}
    </Button>
  </div>
}
