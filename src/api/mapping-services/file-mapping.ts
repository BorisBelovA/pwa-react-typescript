export const mapPhotoNameToURI = (fileString: string): string => {
  return `/api/v1/file/download?path=${fileString}`
}

export const extractFileName = (path: string): string => {
  return path.split('=')[1]
}
