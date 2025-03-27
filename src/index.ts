import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { YouTrackService, ProjectSchema } from "./services/youtrack-service.js";

// Create an MCP server
const server = new McpServer({
  name: "YouTrack MCP",
  version: "1.0.0"
});

// Initialize YouTrack service
const youtrackService = new YouTrackService({
  baseUrl: process.env.YOUTRACK_MCP_URL || process.env.YOUTRACK_URL || "https://youtrack.example.com",
  token: process.env.YOUTRACK_MCP_TOKEN || process.env.YOUTRACK_TOKEN || "perm:your-token-here",
  defaultProject: process.env.YOUTRACK_MCP_PROJECT
});

// Add tool to search issues
server.tool("searchIssues",
  { query: z.string(), limit: z.number().optional() },
  async ({ query, limit }) => {
    try {
      const issues = await youtrackService.searchIssues(query, limit);
      return {
        content: [{ type: "text", text: JSON.stringify(issues, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error searching issues: ${error.message}` }]
      };
    }
  }
);

// Add tool to create an issue
server.tool("createIssue",
  { 
    projectId: z.string().describe("Project ID or shortName"), 
    summary: z.string(), 
    description: z.string().optional() 
  },
  async ({ projectId, summary, description }) => {
    try {
      const issue = await youtrackService.createIssue(projectId, summary, description);
      return {
        content: [{ type: "text", text: `Issue created successfully: ${issue.id}` }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error creating issue: ${error.message}` }]
      };
    }
  }
);

// Add tool to update an issue
server.tool("updateIssue",
  { 
    issueId: z.string().describe("Issue ID or readable ID (e.g., PROJ-123)"), 
    updates: z.object({
      summary: z.string().optional(),
      description: z.string().optional(),
      // Add more fields as needed
    })
  },
  async ({ issueId, updates }) => {
    try {
      await youtrackService.updateIssue(issueId, updates);
      return {
        content: [{ type: "text", text: `Issue ${issueId} updated successfully` }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error updating issue: ${error.message}` }]
      };
    }
  }
);

// Add tool to delete an issue
server.tool("deleteIssue",
  { issueId: z.string().describe("Issue ID or readable ID (e.g., PROJ-123)") },
  async ({ issueId }) => {
    try {
      await youtrackService.deleteIssue(issueId);
      return {
        content: [{ type: "text", text: `Issue ${issueId} deleted successfully` }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error deleting issue: ${error.message}` }]
      };
    }
  }
);

// Add tool to get all projects
server.tool("getProjects",
  {},
  async () => {
    try {
      const projects = await youtrackService.getProjects();
      return {
        content: [{ type: "text", text: JSON.stringify(projects, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error getting projects: ${error.message}` }]
      };
    }
  }
);

// Add tool to get a specific project
server.tool("getProject",
  { projectId: z.string().describe("Project ID or shortName") },
  async ({ projectId }) => {
    try {
      const project = await youtrackService.getProject(projectId);
      return {
        content: [{ type: "text", text: JSON.stringify(project, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error getting project: ${error.message}` }]
      };
    }
  }
);

// Add tool to create a project
server.tool("createProject",
  { 
    name: z.string(), 
    shortName: z.string(), 
    description: z.string().optional() 
  },
  async ({ name, shortName, description }) => {
    try {
      const project = await youtrackService.createProject(name, shortName, description);
      return {
        content: [{ type: "text", text: `Project created successfully: ${project.id}` }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error creating project: ${error.message}` }]
      };
    }
  }
);

// Add tool to update a project
server.tool("updateProject",
  { 
    projectId: z.string().describe("Project ID or shortName"), 
    updates: z.object({
      name: z.string().optional(),
      shortName: z.string().optional(),
      description: z.string().optional(),
      // Add more fields as needed
    })
  },
  async ({ projectId, updates }) => {
    try {
      await youtrackService.updateProject(projectId, updates);
      return {
        content: [{ type: "text", text: `Project ${projectId} updated successfully` }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error updating project: ${error.message}` }]
      };
    }
  }
);

// Add tool to delete a project
server.tool("deleteProject",
  { projectId: z.string().describe("Project ID or shortName") },
  async ({ projectId }) => {
    try {
      await youtrackService.deleteProject(projectId);
      return {
        content: [{ type: "text", text: `Project ${projectId} deleted successfully` }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error deleting project: ${error.message}` }]
      };
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);