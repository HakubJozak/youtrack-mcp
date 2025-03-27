import { defineConfig } from 'orval';

export default defineConfig({
  youtrack: {
    input: {
      target: './docs/youtrack-openapi.json',
    },
    output: {
      mode: 'split',
      target: './api/generated',
      client: 'fetch',
      prettier: true,
      mock: false,
      override: {
        mutator: {
          path: './api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
        operations: {
          // You can add operation overrides here if needed
        },
        useDates: true, // Convert date strings to Date objects
        useTypeOverrides: true,
      },
      schemas: './api/models',
      tslint: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write "./api/**/*.{ts,js,json}"',
    },
  },
});