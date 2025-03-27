# YouTrack MCP

This is a YouTrack MCP server that allows LLMs to create, edit and delete tickets in 
JetBrains Youtrack project management.

- YouTrack REST API - https://www.jetbrains.com/help/youtrack/devportal/api-getting-started.html
- MCP HowTo - https://github.com/modelcontextprotocol/typescript-sdk?tab=readme-ov-file

# TODO

- read YouTrack REST API documentation
- implement YouTrack REST API authentication
- create a simple service object to interact with YouTrack REST API
- implement create, edit and delete ticket functionality


# Setup

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# MCP Inspector
Run MCP inspector to test the capabilities of YouTrack MCP server.

```bash
 npx @modelcontextprotocol/inspector bun run index.ts
```