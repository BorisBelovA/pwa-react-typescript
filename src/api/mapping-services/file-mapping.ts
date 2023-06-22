export const mapPhotoNameToURI = (fileString: string): string => {
  return `/api/v1/file/download?path=${fileString}`
}
