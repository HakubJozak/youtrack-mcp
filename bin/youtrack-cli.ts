#!/usr/bin/env bun

import dotenv from "dotenv";

// Load environment variables
dotenv.config();





const youtrack = new YouTrackService({
  baseUrl: YOUTRACK_MCP_URL,
  token: YOUTRACK_MCP_TOKEN
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
  console.log(`URL: ${YOUTRACK_MCP_URL}`);
  console.log(`Token: ${YOUTRACK_MCP_TOKEN.substring(0, 10)}...`);
  
  const defaultProject = youtrack.getDefaultProject();
  if (defaultProject) {
    console.log(`Default Project: ${defaultProject}`);
  } else {
    console.log('No default project set. Set YOUTRACK_MCP_PROJECT env var to use default project features.');
  }
  
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
  let projectIdentifier = args[1];
  let limit = 10;
  
  // If first argument is a number, it's the limit and we should use default project
  if (projectIdentifier && !isNaN(parseInt(projectIdentifier))) {
    limit = parseInt(projectIdentifier);
    projectIdentifier = null;
  } else if (args[2]) {
    limit = parseInt(args[2]) || 10;
  }
  
  // Try to use provided project or fall back to default
  const defaultProject = youtrack.getDefaultProject();
  if (!projectIdentifier && !defaultProject) {
    console.error("Error: Project ID or shortName is required for list-issues command");
    console.error("Alternatively, set YOUTRACK_MCP_PROJECT in .env file");
    console.log("Usage: ./bin/youtrack-cli.ts list-issues [projectId|shortName] [limit]");
    process.exit(1);
  }
  
  const projectToUse = projectIdentifier || defaultProject;
  const query = `project: ${projectToUse}`;
  
  console.log(`Fetching up to ${limit} issues from project ${projectToUse}...`);
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
  let projectIdentifier = args[1];
  let summary = args[2];
  let description = args[3];
  
  // Check if default project is being used
  const defaultProject = youtrack.getDefaultProject();
  if (defaultProject && !summary) {
    // If only one argument and we have a default project, it's the summary
    summary = projectIdentifier;
    description = args[2];
    projectIdentifier = null;
  }
  
  if ((!projectIdentifier && !defaultProject) || !summary) {
    console.error("Error: Summary and either project ID/shortName or default project are required");
    console.error("Alternatively, set YOUTRACK_MCP_PROJECT in .env file");
    console.log("Usage with project: ./bin/youtrack-cli.ts create-issue <projectId|shortName> <summary> [description]");
    console.log("Usage with default: ./bin/youtrack-cli.ts create-issue <summary> [description]");
    process.exit(1);
  }
  
  const projectToUse = projectIdentifier || defaultProject;
  
  console.log(`Creating issue in project ${projectToUse}...`);
  console.log(`Summary: ${summary}`);
  if (description) {
    console.log(`Description: ${description}`);
  }
  
  try {
    const issue = await youtrack.createIssue(projectToUse, summary, description);
    
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
  const projectIdentifier = args[1];
  
  if (!projectIdentifier) {
    console.error("Error: Project ID or shortName is required for get-project command");
    console.log("Usage: ./bin/youtrack-cli.ts get-project <projectId|shortName>");
    process.exit(1);
  }
  
  console.log(`Fetching project ${projectIdentifier}...`);
  
  try {
    const project = await youtrack.getProject(projectIdentifier);
    
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
  const projectIdentifier = args[1];
  const name = args[2];
  const shortName = args[3];
  const description = args[4];
  
  if (!projectIdentifier || (!name && !shortName && !description)) {
    console.error("Error: Project ID or shortName and at least one field to update are required");
    console.log("Usage: ./bin/youtrack-cli.ts update-project <projectId|shortName> [name] [shortName] [description]");
    process.exit(1);
  }
  
  console.log(`Updating project ${projectIdentifier}...`);
  
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
    const project = await youtrack.updateProject(projectIdentifier, updates);
    
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
  const projectIdentifier = args[1];
  
  if (!projectIdentifier) {
    console.error("Error: Project ID or shortName is required for delete-project command");
    console.log("Usage: ./bin/youtrack-cli.ts delete-project <projectId|shortName>");
    process.exit(1);
  }
  
  console.log(`Deleting project ${projectIdentifier}...`);
  
  try {
    await youtrack.deleteProject(projectIdentifier);
    console.log(`Project ${projectIdentifier} deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete project:");
    console.error(error.message);
    process.exit(1);
  }
}

function showHelp() {
  const defaultProject = youtrack.getDefaultProject();
  const defaultProjectMsg = defaultProject ? 
    `Default project: ${defaultProject} (from YOUTRACK_MCP_PROJECT)` : 
    'No default project set. Use YOUTRACK_MCP_PROJECT env var to set one.';
  
  console.log(`
YouTrack CLI - Command line interface for YouTrack

${defaultProjectMsg}

Usage:
  ./bin/youtrack-cli.ts <command> [options]

General Commands:
  test-connection              Test connection to YouTrack API

Issue Commands:
  list-issues [projectId|shortName] [limit]              List issues in a project
  create-issue [projectId|shortName] <summary> [description]  Create a new issue

Project Commands:
  list-projects                List all projects
  get-project <projectId|shortName>      Get details of a specific project
  create-project <name> <shortName> [description]  Create a new project
  update-project <projectId|shortName> [name] [shortName] [description]  Update a project
  delete-project <projectId|shortName>   Delete a project

Default Project:
  When a default project is set (via YOUTRACK_MCP_PROJECT), you can omit the project parameter:
  ./bin/youtrack-cli.ts list-issues 5                   List 5 issues from default project
  ./bin/youtrack-cli.ts create-issue "Fix bug" "Description"   Create issue in default project

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