# YouTrack MCP

**WARNING - this is a work in progress POC, not production ready MCP. Feel free to contribute.**

This is a YouTrack MCP server that allows LLMs to create, edit and delete tickets in 
JetBrains Youtrack project management.

- YouTrack REST API - https://www.jetbrains.com/help/youtrack/devportal/api-getting-started.html
- FastMCP README - https://github.com/yjacquin/fast-mcp
- Swagger/Open API Specs are in docs/youtrack-openapi.json
- CLI is using https://github.com/commander-rb/commander as a option parser DSL

## Implementation

- using Ruby gem FastMCP to implement the server
