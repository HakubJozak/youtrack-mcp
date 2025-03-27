import dotenv from 'dotenv';
import { configureYouTrackApi } from './index';
import {
  getIssues,
  postIssues,
  getProjects,
  getProject,
  getIssue,
  postIssueComment
} from './generated/youTrackRESTAPI';
import { ErrorType } from './mutator/custom-instance';

// Load environment variables
dotenv.config();

// Configure the API client with environment variables
configureYouTrackApi({
  baseUrl: process.env.YOUTRACK_MCP_URL || process.env.YOUTRACK_URL,
  token: process.env.YOUTRACK_MCP_TOKEN || process.env.YOUTRACK_TOKEN,
  defaultProject: process.env.YOUTRACK_MCP_PROJECT
});

// Example: List recent issues
async function listRecentIssues() {
  try {
    const defaultProject = process.env.YOUTRACK_MCP_PROJECT;
    const query = defaultProject ? `project: ${defaultProject}` : '';
    
    const issues = await getIssues({
      query,
      $top: 10,
      fields: 'id,summary,description,created,updated,project(name,shortName)'
    });
    
    console.log('Recent Issues:');
    issues.forEach(issue => {
      console.log(`- [${issue.id}] ${issue.summary}`);
    });
  } catch (error) {
    const apiError = error as ErrorType<Error>;
    console.error(`Error fetching issues (${apiError.status}): ${error.message}`);
  }
}

// Example: Create a new issue
async function createIssue(summary: string, description?: string) {
  try {
    const defaultProject = process.env.YOUTRACK_MCP_PROJECT;
    if (!defaultProject) {
      throw new Error('No default project set. Please set YOUTRACK_MCP_PROJECT.');
    }
    
    const projects = await getProjects({
      fields: 'id,name,shortName'
    });
    
    const project = projects.find(p => p.shortName === defaultProject);
    if (!project) {
      throw new Error(`Project with shortName '${defaultProject}' not found.`);
    }
    
    const newIssue = await postIssues({
      project: { id: project.id },
      summary,
      description
    });
    
    console.log(`Issue created successfully: ${newIssue.id}`);
    console.log(`Summary: ${newIssue.summary}`);
    if (newIssue.description) {
      console.log(`Description: ${newIssue.description}`);
    }
    
    return newIssue;
  } catch (error) {
    const apiError = error as ErrorType<Error>;
    console.error(`Error creating issue (${apiError.status}): ${error.message}`);
    throw error;
  }
}

// Example: Add a comment to an issue
async function addComment(issueId: string, text: string) {
  try {
    const comment = await postIssueComment({
      issueId,
      text
    });
    
    console.log(`Comment added to issue ${issueId}`);
    return comment;
  } catch (error) {
    const apiError = error as ErrorType<Error>;
    console.error(`Error adding comment (${apiError.status}): ${error.message}`);
    throw error;
  }
}

// Example: Get detailed issue information
async function getIssueDetails(issueIdOrReadableId: string) {
  try {
    const issue = await getIssue({
      issueId: issueIdOrReadableId,
      fields: 'id,summary,description,created,updated,customFields(name,value),comments(text)'
    });
    
    console.log(`Issue Details for ${issueIdOrReadableId}:`);
    console.log(`ID: ${issue.id}`);
    console.log(`Summary: ${issue.summary}`);
    if (issue.description) {
      console.log(`Description: ${issue.description}`);
    }
    
    if (issue.customFields && issue.customFields.length > 0) {
      console.log('Custom Fields:');
      issue.customFields.forEach(field => {
        console.log(`- ${field.name}: ${JSON.stringify(field.value)}`);
      });
    }
    
    return issue;
  } catch (error) {
    const apiError = error as ErrorType<Error>;
    console.error(`Error fetching issue (${apiError.status}): ${error.message}`);
    throw error;
  }
}

// Export examples to be used as an entry point
export const examples = {
  listRecentIssues,
  createIssue,
  addComment,
  getIssueDetails
};

// Main function to run examples when this file is executed directly
async function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'list':
      await listRecentIssues();
      break;
    case 'create':
      const summary = process.argv[3];
      const description = process.argv[4];
      if (!summary) {
        console.error('Error: Summary is required for create command');
        process.exit(1);
      }
      await createIssue(summary, description);
      break;
    case 'comment':
      const issueId = process.argv[3];
      const text = process.argv[4];
      if (!issueId || !text) {
        console.error('Error: Issue ID and comment text are required');
        process.exit(1);
      }
      await addComment(issueId, text);
      break;
    case 'get':
      const id = process.argv[3];
      if (!id) {
        console.error('Error: Issue ID is required');
        process.exit(1);
      }
      await getIssueDetails(id);
      break;
    default:
      console.log(`
YouTrack API Examples

Usage:
  bun run api/examples.ts <command> [options]

Commands:
  list                 List recent issues
  create <summary> [description]  Create a new issue
  comment <issueId> <text>        Add a comment to an issue
  get <issueId>        Get issue details
      `);
  }
}

// Run main() if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error(`Unhandled error: ${error.message}`);
    process.exit(1);
  });
}