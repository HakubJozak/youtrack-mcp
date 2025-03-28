import { defineConfig } from 'orval';

export default defineConfig({
  youtrack: {
    input: {
      target: './docs/youtrack-openapi.json',
    },
    output: {
      mode: 'split',
      target: './src/youtrack',
      client: 'axios',
      prettier: true,
      mock: false,
      override: {
        mutator: {
          path: './src/services/custom-axios-instance.ts',
          name: 'customAxiosInstance',
        },
        operations: {
          // You can add operation overrides here if needed
        },
        useDates: true, // Convert date strings to Date objects
      },
      schemas: './src/youtrack/models',
      tslint: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write "./src/youtrack/**/*.{ts,js,json}"',
    },
  },
});