# CLAUDE.md - YouTrack MCP Development Guide

## Build & Run Commands
- Install dependencies: `bun install`
- Run application: `bun run index.ts`
- Test with MCP inspector: `npx @modelcontextprotocol/inspector bun run index.ts`

## Code Style Guidelines
- **TypeScript**: Use strict mode, leverage type safety features
- **Imports**: Use full path including file extensions, organize by external/internal
- **Formatting**: 2-space indentation, use semicolons, max 100 chars per line
- **Types**: Prefer explicit types, use Zod for runtime validation
- **Naming**:
  - camelCase for variables, functions, methods
  - PascalCase for classes, interfaces, types
  - UPPER_SNAKE_CASE for constants
- **Error Handling**: Use async/await with try/catch blocks, proper error objects
- **Architecture**: Follow modular design, separation of concerns
- **Testing**: Add unit tests for all new functionality (when testing framework is added)

## Project Structure
The codebase uses Bun as the JavaScript runtime with TypeScript and follows MCP server architecture patterns. Files should be organized by feature/domain with clear separation between API, services, and utility functions.

## Documentation
Include JSDoc comments for functions and provide clear README updates for significant changes.