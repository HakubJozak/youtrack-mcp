import { defineConfig } from '@hey-api/openapi-ts';


export default defineConfig({
  input: 'docs/youtrack-openapi.json',
  output: {
    path: 'src/client',
    lint: 'eslint',
    format: 'prettier',
  },
  configFile: 'docs/youtrack-openapi.json',
  plugins: ['@hey-api/client-fetch', '@hey-api/typescript', '@hey-api/sdk'],
});
