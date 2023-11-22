export const mapPhotoNameToURI = (fileString: string): string => {
  const encodedFileString = fileString.replace('+', '%2B')
  const baseURI = process.env.REACT_APP_HOST_TYPE === 'LOCAL'
    ? '/api/v1'
    : process.env.REACT_APP_HOST_TYPE === 'DEV'
      ? 'https://api.dev.roommate.host/api/v1'
      // For PROD
      : ''
  return `${baseURI}/file/download?path=${encodedFileString}`
}

export const extractFileName = (path: string): string => {
  return path.split('=')[1]
}
