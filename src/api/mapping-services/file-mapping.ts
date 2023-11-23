export const mapPhotoNameToURI = (fileString: string): string => {
  const encodedFileString = fileString.replace('+', '%2B')
  const baseURI = process.env.REACT_APP_HOST_TYPE === 'LOCAL' || process.env.REACT_APP_HOST_TYPE === 'DEV'
    ? 'https://api.dev.roommate.host/api/v1'
    : 'https://api.prod.roommate.host/api/v1'
  return `${baseURI}/file/download?path=${encodedFileString}`
}

export const extractFileName = (path: string): string => {
  return path.split('=')[1]
}
