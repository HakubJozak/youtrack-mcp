# YouTrack API Client

This directory contains an auto-generated TypeScript client for the YouTrack REST API, created using [Orval](https://orval.dev/).

## Features

- Complete type-safe API client generated from YouTrack OpenAPI specification
- Fetch-based implementation
- Environment variable configuration for API URL and authentication
- Support for default project when interacting with issues

## Usage

### Configuration

The API client uses environment variables for configuration:

```typescript
import { configureYouTrackApi } from './api';

// Configure with environment variables
configureYouTrackApi({
  baseUrl: 'https://youtrack.example.com',
  token: 'your-permanent-token',
  defaultProject: 'PROJ' // Optional default project
});
```

Alternatively, you can set these environment variables directly:

- `YOUTRACK_MCP_URL` - The base URL of your YouTrack instance
- `YOUTRACK_MCP_TOKEN` - Your YouTrack permanent token
- `YOUTRACK_MCP_PROJECT` - (Optional) Default project identifier to use

### Basic Examples

```typescript
import { 
  getIssues, 
  postIssues,
  getProject,
  getProjects 
} from './api/generated/youTrackRESTAPI';

// Get all issues
const issues = await getIssues({
  query: 'project: PROJ',
  $top: 10
});

// Create a new issue
const newIssue = await postIssues({
  project: { id: 'project-id' }, // or shortName if using project shortname
  summary: 'New Issue',
  description: 'Issue description'
});

// Get projects
const projects = await getProjects();

// Get project details
const project = await getProject({
  projectId: 'PROJ'
});
```

### Error Handling

The API client includes robust error handling:

```typescript
import { getIssue } from './api/generated/youTrackRESTAPI';
import { ErrorType } from './api';

try {
  const issue = await getIssue({
    issueId: 'non-existent-id'
  });
} catch (error) {
  const apiError = error as ErrorType<Error>;
  console.error(`Status: ${apiError.status}`);
  console.error(error.message);
}
```

## API Structure

The API client follows the structure of the YouTrack REST API:

- **Issues**: Create, read, update, and delete issues
- **Projects**: Manage projects and their settings
- **Users**: User management and profiles
- **Time Tracking**: Work item tracking
- **Agile Boards**: Manage agile boards and sprints
- **Articles**: Knowledge base articles
- **Tags**: Issue tagging functionality

## Notes

- This client is auto-generated from the YouTrack OpenAPI specification
- It provides type-safe access to all YouTrack REST API endpoints
- The custom fetch instance handles authentication automatically