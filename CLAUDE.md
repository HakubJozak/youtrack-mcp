# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands
- Install dependencies: `bundle install`
- Run CLI commands: `bin/youtrack [command]` (e.g., `bin/youtrack projects`)
- Set up environment variables in `.env` file (required: YOUTRACK_MCP_URL, YOUTRACK_MCP_TOKEN, YOUTRACK_MCP_PROJECT)
- Run MCP server: `bundle exec fast-mcp` (when implemented)

## Code Style Guidelines
- **Ruby Conventions**: Follow standard Ruby style, 2-space indentation
- **Frozen String Literals**: Use `# frozen_string_literal: true` comment at top of files
- **Classes/Modules**: Use PascalCase for class and module names
- **Methods/Variables**: Use snake_case for method and variable names
- **Constants**: Use SCREAMING_SNAKE_CASE for constants
- **Environment Variables**: Use YOUTRACK_MCP_* prefix for all environment variables
- **Error Handling**: Use raise/rescue pattern with descriptive error messages
- **Documentation**: Include comments for public methods and modules
- **Imports**: Group gems first, then relative imports
- **API Client**: All API calls should go through YoutrackApiClient class
- **Service Layer**: Business logic belongs in YoutrackService

## Architecture Pattern
The codebase follows a simple client-service pattern with Commander for CLI commands, HTTP gem for API requests, and will use FastMCP for MCP server implementation.