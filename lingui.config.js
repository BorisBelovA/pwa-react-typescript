/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'he', 'ru'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src']
    }
  ],
  format: 'po'
}
