#!/usr/bin/env bun
import { YouTrackService } from "../src/services/youtrack-service.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const YOUTRACK_URL = process.env.YOUTRACK_URL;
const YOUTRACK_TOKEN = process.env.YOUTRACK_TOKEN;

if (!YOUTRACK_URL || !YOUTRACK_TOKEN) {
  console.error("Error: YOUTRACK_URL and YOUTRACK_TOKEN must be set in .env file");
  process.exit(1);
}

// Initialize YouTrack service
const youtrack = new YouTrackService({
  baseUrl: YOUTRACK_URL,
  token: YOUTRACK_TOKEN
});

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  try {
    switch (command) {
      // Issue commands
      case "list-issues":
        await listIssues();
        break;
      case "create-issue":
        await createIssue();
        break;
      
      // Project commands
      case "list-projects":
        await listProjects();
        break;
      case "get-project":
        await getProject();
        break;
      case "create-project":
        await createProject();
        break;
      case "update-project":
        await updateProject();
        break;
      case "delete-project":
        await deleteProject();
        break;
      
      // General commands
      case "test-connection":
        await testConnection();
        break;
      
      // Default help
      default:
        showHelp();
        break;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

async function testConnection() {
  console.log("Testing connection to YouTrack...");
  console.log(`URL: ${YOUTRACK_URL}`);
  console.log(`Token: ${YOUTRACK_TOKEN.substring(0, 10)}...`);
  
  try {
    const user = await youtrack.getCurrentUser();
    console.log("Connection successful!");
    console.log("Current user:", JSON.stringify(user, null, 2));
  } catch (error) {
    console.error("Connection failed!");
    console.error(error.message);
    process.exit(1);
  }
}

async function listIssues() {
  const projectId = args[1];
  
  if (!projectId) {
    console.error("Error: Project ID is required for list-issues command");
    console.log("Usage: ./bin/youtrack-cli.ts list-issues <projectId> [limit]");
    process.exit(1);
  }
  
  const limit = parseInt(args[2]) || 10;
  const query = `project: ${projectId}`;
  
  console.log(`Fetching up to ${limit} issues from project ${projectId}...`);
  console.log(`Query: "${query}"`);
  
  try {
    const issues = await youtrack.searchIssues(query, limit);
    
    if (!issues || issues.length === 0) {
      console.log("No issues found.");
      return;
    }
    
    console.log(`Found ${issues.length} issues:`);
    issues.forEach(issue => {
      console.log(`- [${issue.id}] ${issue.summary}`);
    });
  } catch (error) {
    console.error("Failed to fetch issues:");
    console.error(error.message);
    process.exit(1);
  }
}

async function createIssue() {
  const projectId = args[1];
  const summary = args[2];
  const description = args[3];
  
  if (!projectId || !summary) {
    console.error("Error: Project ID and summary are required for create-issue command");
    console.log("Usage: ./bin/youtrack-cli.ts create-issue <projectId> <summary> [description]");
    process.exit(1);
  }
  
  console.log(`Creating issue in project ${projectId}...`);
  console.log(`Summary: ${summary}`);
  if (description) {
    console.log(`Description: ${description}`);
  }
  
  try {
    const issue = await youtrack.createIssue(projectId, summary, description);
    
    console.log(`Issue created successfully: ${issue.id}`);
    console.log(`Summary: ${issue.summary}`);
    if (issue.description) {
      console.log(`Description: ${issue.description}`);
    }
  } catch (error) {
    console.error("Failed to create issue:");
    console.error(error.message);
    process.exit(1);
  }
}

// Project Management Functions
async function listProjects() {
  console.log("Fetching all projects...");
  
  try {
    const projects = await youtrack.getProjects();
    
    if (!projects || projects.length === 0) {
      console.log("No projects found.");
      return;
    }
    
    console.log(`Found ${projects.length} projects:`);
    projects.forEach(project => {
      console.log(`- [${project.id}] ${project.name} (${project.shortName})`);
      if (project.description) {
        console.log(`  Description: ${project.description}`);
      }
    });
  } catch (error) {
    console.error("Failed to fetch projects:");
    console.error(error.message);
    process.exit(1);
  }
}

async function getProject() {
  const projectId = args[1];
  
  if (!projectId) {
    console.error("Error: Project ID is required for get-project command");
    console.log("Usage: ./bin/youtrack-cli.ts get-project <projectId>");
    process.exit(1);
  }
  
  console.log(`Fetching project ${projectId}...`);
  
  try {
    const project = await youtrack.getProject(projectId);
    
    console.log(`Project ID: ${project.id}`);
    console.log(`Name: ${project.name}`);
    console.log(`Short Name: ${project.shortName}`);
    if (project.description) {
      console.log(`Description: ${project.description}`);
    }
  } catch (error) {
    console.error("Failed to fetch project:");
    console.error(error.message);
    process.exit(1);
  }
}

async function createProject() {
  const name = args[1];
  const shortName = args[2];
  const description = args[3];
  
  if (!name || !shortName) {
    console.error("Error: Name and short name are required for create-project command");
    console.log("Usage: ./bin/youtrack-cli.ts create-project <name> <shortName> [description]");
    process.exit(1);
  }
  
  console.log(`Creating project...`);
  console.log(`Name: ${name}`);
  console.log(`Short Name: ${shortName}`);
  if (description) {
    console.log(`Description: ${description}`);
  }
  
  try {
    const project = await youtrack.createProject(name, shortName, description);
    
    console.log(`Project created successfully: ${project.id}`);
    console.log(`Name: ${project.name}`);
    console.log(`Short Name: ${project.shortName}`);
    if (project.description) {
      console.log(`Description: ${project.description}`);
    }
  } catch (error) {
    console.error("Failed to create project:");
    console.error(error.message);
    process.exit(1);
  }
}

async function updateProject() {
  const projectId = args[1];
  const name = args[2];
  const shortName = args[3];
  const description = args[4];
  
  if (!projectId || (!name && !shortName && !description)) {
    console.error("Error: Project ID and at least one field to update are required");
    console.log("Usage: ./bin/youtrack-cli.ts update-project <projectId> [name] [shortName] [description]");
    process.exit(1);
  }
  
  console.log(`Updating project ${projectId}...`);
  
  const updates: Record<string, string> = {};
  
  if (name) {
    updates.name = name;
    console.log(`Name: ${name}`);
  }
  
  if (shortName) {
    updates.shortName = shortName;
    console.log(`Short Name: ${shortName}`);
  }
  
  if (description) {
    updates.description = description;
    console.log(`Description: ${description}`);
  }
  
  try {
    const project = await youtrack.updateProject(projectId, updates);
    
    console.log(`Project updated successfully: ${project.id}`);
    console.log(`Name: ${project.name}`);
    console.log(`Short Name: ${project.shortName}`);
    if (project.description) {
      console.log(`Description: ${project.description}`);
    }
  } catch (error) {
    console.error("Failed to update project:");
    console.error(error.message);
    process.exit(1);
  }
}

async function deleteProject() {
  const projectId = args[1];
  
  if (!projectId) {
    console.error("Error: Project ID is required for delete-project command");
    console.log("Usage: ./bin/youtrack-cli.ts delete-project <projectId>");
    process.exit(1);
  }
  
  console.log(`Deleting project ${projectId}...`);
  
  try {
    await youtrack.deleteProject(projectId);
    console.log(`Project ${projectId} deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete project:");
    console.error(error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
YouTrack CLI - Command line interface for YouTrack

Usage:
  ./bin/youtrack-cli.ts <command> [options]

General Commands:
  test-connection              Test connection to YouTrack API

Issue Commands:
  list-issues <projectId> [limit]              List issues in a project
  create-issue <projectId> <summary> [description]  Create a new issue

Project Commands:
  list-projects                List all projects
  get-project <projectId>      Get details of a specific project
  create-project <name> <shortName> [description]  Create a new project
  update-project <projectId> [name] [shortName] [description]  Update a project
  delete-project <projectId>   Delete a project

Examples:
  ./bin/youtrack-cli.ts test-connection                     Test API connection
  ./bin/youtrack-cli.ts list-issues PROJ 5                  List 5 issues from project PROJ
  ./bin/youtrack-cli.ts create-issue PROJ "Fix bug" "Description"
  ./bin/youtrack-cli.ts list-projects                       List all projects
  ./bin/youtrack-cli.ts create-project "My Project" MYPROJ "Description"
  ./bin/youtrack-cli.ts update-project MYPROJ "New Name"
  ./bin/youtrack-cli.ts delete-project MYPROJ
  `);
}

main().catch(error => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});