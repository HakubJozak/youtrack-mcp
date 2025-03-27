// Export all from generated API
export * from './generated';

// Export custom instance
export { customInstance, type ErrorType } from './mutator/custom-instance';

// Add configuration types
export interface YouTrackApiConfig {
  baseUrl?: string;
  token?: string;
  defaultProject?: string;
}

// Function to configure the API with custom settings
export const configureYouTrackApi = (config: YouTrackApiConfig): void => {
  if (config.baseUrl) {
    process.env.YOUTRACK_MCP_URL = config.baseUrl;
  }
  
  if (config.token) {
    process.env.YOUTRACK_MCP_TOKEN = config.token;
  }
  
  if (config.defaultProject) {
    process.env.YOUTRACK_MCP_PROJECT = config.defaultProject;
  }
};