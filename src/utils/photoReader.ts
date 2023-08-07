import heic2any from 'heic2any'
import { type Message } from 'src/components/MessageAlert/MessageAlert'

interface Props {
  photo: File
  setBackdropVisible: (visible: boolean) => void
  setBackdropMessage: (message: string) => void
  setMessage: (message: Message | null) => void
}

export const photoReader = async ({ photo, setBackdropVisible, setBackdropMessage, setMessage }: Props): Promise<FileReader> => {
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
