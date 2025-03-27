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
      case "list":
        await listIssues();
        break;
      case "create":
        await createIssue();
        break;
      case "test-connection":
        await testConnection();
        break;
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
    console.error("Error: Project ID is required for list command");
    console.log("Usage: ./bin/youtrack-cli.ts list <projectId> [limit]");
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
    console.error("Error: Project ID and summary are required for create command");
    console.log("Usage: ./bin/youtrack-cli.ts create <projectId> <summary> [description]");
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

function showHelp() {
  console.log(`
YouTrack CLI - Simple command line interface for YouTrack

Usage:
  ./bin/youtrack-cli.ts <command> [options]

Commands:
  test-connection              Test connection to YouTrack API 
  list <projectId> [limit]     List issues in a project
  create <projectId> <summary> [description]  Create a new issue

Examples:
  ./bin/youtrack-cli.ts test-connection      Test API connection
  ./bin/youtrack-cli.ts list PROJ 5          List 5 issues from project PROJ
  ./bin/youtrack-cli.ts create PROJ "Fix bug" "The login button doesn't work"
  `);
}

main().catch(error => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});