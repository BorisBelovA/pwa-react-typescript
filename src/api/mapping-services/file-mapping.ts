export const mapPhotoNameToURI = (fileString: string): string => {
  const encodedFileString = fileString.replace('+', '%2B')
  return `/api/v1/file/download?path=${encodedFileString}`
}

export const extractFileName = (path: string): string => {
  return path.split('=')[1]
}
