# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands
- Install dependencies: `bundle install`
- Run CLI commands: `bin/youtrack [command]` (e.g., `bin/youtrack projects`)
- Set up environment variables in `.env` file (required: YOUTRACK_MCP_URL, YOUTRACK_MCP_TOKEN, YOUTRACK_MCP_PROJECT)

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

## Libraries & Gems
- experiment with 'mcp-rb' and fast-mcp to implement the MCP protocol
- commander for CLI
- http.rb gem for HTTP requests

## Architecture Pattern
- use YoutrackService for business logic and YoutrackApiClient for API calls

