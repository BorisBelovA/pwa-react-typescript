export const mapPhotoNameToURI = (fileString: string): string => {
  const encodedFileString = fileString.replace('+', '%2B')
  const baseURI = 'https://api.prod.roommate.host/api/v1'
  return `${baseURI}/file/download?path=${encodedFileString}`
}

export const extractFileName = (path: string): string => {
  return path.split('=')[1]
}
