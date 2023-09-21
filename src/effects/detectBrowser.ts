type Browser = 'IE' | 'Edge' | 'Chrome' | 'Safari' | 'Firefox' | 'Opera' | 'Other'

export const useDetectBrowser = (): Browser => {
  if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) != -1) {
    return 'Opera'
  }
  if (navigator.userAgent.indexOf('Edg') != -1) {
    return 'Edge'
  }
  if (navigator.userAgent.indexOf('Chrome') != -1) {
    return 'Chrome'
  }
  if (navigator.userAgent.indexOf('Safari') != -1) {
    return 'Safari'
  }
  if (navigator.userAgent.indexOf('Firefox') != -1) {
    return 'Firefox'
  }
  if ((navigator.userAgent.indexOf('MSIE') != -1) || ('documentMode' in document && !!document.documentMode == true)) {
    return 'IE'
  }
  return 'Other'
}