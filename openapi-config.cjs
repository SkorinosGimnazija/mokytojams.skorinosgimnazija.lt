// https://redux-toolkit.js.org/rtk-query/usage/code-generation#openapi

module.exports = {
  schemaFile: 'http://localhost:5000/openapi/v1.json',
  apiFile: './src/services/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './src/services/generatedApi.ts',
  exportName: 'generatedApi',
  filterEndpoints: [/^(?!.*public).*$/i, /GetPostByUrlPublic/i],
  flattenArg: true,
  hooks: true,
  tag: true,
}