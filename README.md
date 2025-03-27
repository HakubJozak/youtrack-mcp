# YouTrack MCP

This is a YouTrack MCP server that allows LLMs to create, edit and delete tickets in 
JetBrains Youtrack project management.

- YouTrack REST API - https://www.jetbrains.com/help/youtrack/devportal/api-getting-started.html
- MCP HowTo - https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file
- Swagger/Open API Specs are in docs/youtrack-openapi.json


## Setup

To install dependencies:

```bash
bun install
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then edit the `.env` file to add your YouTrack URL and permanent token:

```
YOUTRACK_URL=https://youtrack.yourcompany.com
YOUTRACK_TOKEN=perm:your-permanent-token-here
```

To get a permanent token:
1. Go to your YouTrack profile
2. Navigate to "Authentication" > "New Token"
3. Create a token with appropriate permissions
4. Copy the generated token that starts with "perm:"

## Running the Server

To run:

```bash
bun run index.ts
```

## Testing with MCP Inspector

Run MCP inspector to test the capabilities of YouTrack MCP server.

```bash
npx @modelcontextprotocol/inspector bun run index.ts
```

## Available Tools

The YouTrack MCP server provides the following tools:

- `searchIssues`: Search for issues using YouTrack query language
- `createIssue`: Create a new issue in a project
- `updateIssue`: Update an existing issue's properties
- `deleteIssue`: Delete an issue

## CLI Usage

The project includes a simple CLI for interacting with YouTrack:

```bash
# Make the CLI executable
chmod +x ./bin/youtrack-cli.ts

# Test your connection to YouTrack
./bin/youtrack-cli.ts test-connection

# List issues in a project
./bin/youtrack-cli.ts list PROJECT_ID [limit]

# Create a new issue
./bin/youtrack-cli.ts create PROJECT_ID "Issue summary" "Optional description"

# Show help
./bin/youtrack-cli.ts
```

This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
