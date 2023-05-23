/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} imageSrc - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */

import { type Area } from 'react-easy-crop'

const createImage = async (url: string): Promise<HTMLImageElement> =>
  await new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => { resolve(image) })
    image.addEventListener('error', (error) => { reject(error) })
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

function getRadianAngle (degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

export default async function getCroppedImg (imageSrc: string, pixelCrop: Area, rotation = 0): Promise<HTMLCanvasElement> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea
  if (ctx == null) {
    throw new Error('awdawd')
  }
  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-safeArea / 2, -safeArea / 2)

  ctx.beginPath()

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )

  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  )

  // As Base64 string
  // return canvas.toDataURL("image/jpeg");
  return canvas
}

export const getUrl = async (imageSrc: string, crop: Area): Promise<string | undefined> => {
  if ((crop === null || crop === undefined) || (imageSrc.length === 0)) {
    return undefined
  }

  const canvas = await getCroppedImg(imageSrc, crop)

  return canvas.toDataURL('image/jpeg')
}

export const generateDownload = async (imageSrc: string, crop: Area): Promise<string | undefined> => {
  if ((crop === null || crop === undefined) || (imageSrc.length === 0)) {
    return undefined
  }

  const canvas = await getCroppedImg(imageSrc, crop)

  canvas.toBlob(
    (blob) => {
      if (blob == null) {
        throw new Error('no blob')
      }
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'image.jpeg'
      anchor.href = URL.createObjectURL(blob)
      anchor.click()

      window.URL.revokeObjectURL(previewUrl)
    },
    'image/jpeg',
    0.66
  )
}
