# YouTrack MCP

**WARNING - this is a work in progress POC, not production ready MCP. Feel free to contribute.**

This is a YouTrack MCP server that allows LLMs to create, edit and delete tickets in 
JetBrains Youtrack project management.

- YouTrack REST API - https://www.jetbrains.com/help/youtrack/devportal/api-getting-started.html
- FastMCP README - https://github.com/yjacquin/fast-mcp
- Swagger/Open API Specs are in docs/youtrack-openapi.json
- CLI is using https://github.com/commander-rb/commander as a option parser DSL
- Minitest - https://docs.seattlerb.org/minitest/

## YouTrack Query Language

YouTrack Query Language is a specific language for querying issues in YouTrack. 

- docs: https://www.jetbrains.com/help/youtrack/cloud/search-and-command-attributes.html?Search-and-Command-Attributes

## Implementation

- using Ruby gem FastMCP to implement the server
