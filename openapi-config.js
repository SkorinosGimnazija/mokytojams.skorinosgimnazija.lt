module.exports = {
  schemaFile: 'http://localhost:5000/swagger/v1/swagger.json',
  apiFile: './src/services/baseApi.ts',
  apiImport: 'baseApi',
  outputFile: './src/services/api.ts',
  exportName: 'api',
  hooks: true,
};
