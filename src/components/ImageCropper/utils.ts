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

export default async function getCroppedImg (imageSrc: string, pixelCrop: Area): Promise<HTMLCanvasElement> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (ctx == null) {
    throw new Error('awdawd')
  }

  ctx.beginPath()

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  const sourceX = pixelCrop.x
  const sourceY = pixelCrop.y
  const sourceWidth = pixelCrop.width
  const sourceHeight = pixelCrop.height
  const destX = 0
  const destY = 0
  const destWidth = pixelCrop.width
  const destHeight = pixelCrop.height

  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)

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
