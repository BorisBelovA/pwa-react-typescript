export const mapFileToBase64 = (fileString: string): string => {
  return `data:image/png;base64,${fileString}`
}
