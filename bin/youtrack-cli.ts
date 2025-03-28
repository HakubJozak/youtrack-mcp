#!/usr/bin/env bun

import dotenv from "dotenv";
import {getAdminProjects} from "../src/client";




// Load environment variables
dotenv.config();

const YOUTRACK_MCP_PROJECT = process.env.YOUTRACK_MCP_PROJECT;


// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];



async function main() {
  try {
    switch (command) {
      // Issue commands
      case "list-projects":
        await listProjects();
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


async function listProjects() {
  const response = await getAdminProjects()
  const projects = response.data || []

  console.log(response.error)
  console.log(response.data)

  console.log(`Found ${projects.length} projects:`)

  projects.forEach(project => {
    console.log(`${project.id}: ${project.name} (${project.shortName})`)
  })
}



function showHelp() {
  const defaultProjectMsg = 'Hey'
  // const defaultProject = getDefaultProject();
  // const defaultProjectMsg = defaultProject ?
  //   `Default project: ${defaultProject} (from YOUTRACK_MCP_PROJECT)` :
  //   'No default project set. Use YOUTRACK_MCP_PROJECT env var to set one.';
  
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