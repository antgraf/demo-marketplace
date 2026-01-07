# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **demonstration repository** for educational purposes, specifically designed to showcase Claude Code plugin/skill development patterns for a LinkedIn article. The goal is clarity and demonstrating patterns, not production-ready complexity.

## How This Marketplace Works

Users install plugins from this repository using Claude Code's built-in marketplace commands:
- `/plugin marketplace add antgraf/demo-marketplace` - Adds this repo as a plugin source
- `/plugin install code-formatter@demo-marketplace` - Installs a specific plugin

Claude Code reads the `marketplace.json` file to discover available plugins and fetches them directly from GitHub. No cloning required.

## Architecture Overview

### Plugin System Structure

The repository demonstrates a marketplace pattern for Claude Code plugins:

- **marketplace.json**: Central registry that indexes all available plugins with metadata (id, name, version, category, tags, path, entrypoint)
- **plugins/**: Directory containing individual plugin packages, each self-contained with implementation, metadata, and documentation
- Each plugin follows the **Agent pattern** from `@claude/sdk`

### Plugin Architecture Pattern

Every plugin in this marketplace follows a three-component structure:

1. **Agent Definition**: Name and description for discoverability
2. **Input Schema**: Zod-based runtime type validation and documentation
3. **Execution Logic**: Pure async function in the `run()` method

Example from `plugins/code-formatter/skill.ts`:
```typescript
const agent = new Agent({
  name: "code-formatter",           // Unique identifier
  description: "...",                // What it does
  inputSchema: z.object({...}),     // Type-safe inputs with .describe()
  async run(input) { return {...}; } // Pure logic, returns structured data
});
```

### Key Design Decisions

**Why Zod**: Provides runtime validation for user inputs where compile-time TypeScript types aren't sufficient. Essential for plugin boundaries where inputs can't be guaranteed at compile time.

**Self-Contained Plugins**: Each plugin has its own directory with skill.ts, package.json, and README.md. This makes plugins independently understandable, testable, and distributable.

**No Build System**: This is intentionally a minimal demo. The .gitignore excludes build artifacts, but there's no actual build configuration since this is for demonstration.

## Working With This Repository

### Adding a New Plugin

1. Create a new directory under `plugins/your-plugin-name/`
2. Required files:
   - `skill.ts`: Agent implementation (see code-formatter as template)
   - `package.json`: Must include `claudePlugin` metadata with `type` and `entrypoint`
   - `README.md`: User-facing documentation with usage examples
3. Update `marketplace.json` to register the new plugin in the `plugins` array
4. Use `code-formatter` as the canonical reference implementation

### Plugin Metadata Requirements

In package.json:
- Name must follow `@demo-marketplace/plugin-name` convention
- Include `claudePlugin.type: "skill"` and `claudePlugin.entrypoint: "skill.ts"`
- Declare `@claude/sdk` as a peerDependency

In marketplace.json:
- Assign a unique `id` matching the plugin directory name
- Specify `category` from the defined categories list
- Include descriptive `tags` for discoverability
- Set `path` relative to repo root: `./plugins/plugin-name`

### Code Formatter Plugin Details

The example plugin at `plugins/code-formatter/skill.ts` demonstrates:

- **Input validation**: Three parameters (code: string, language: enum, indentSize: number with default)
- **Language switching**: Simple switch statement for different formatting logic per language
- **Error handling**: Try-catch for JSON parsing with descriptive errors
- **Structured returns**: Returns object with formatted code, metadata, and status message

The implementation is intentionally simple for educational clarity. Real formatters would use AST parsing libraries.

## Documentation Files

- **README.md**: Main user-facing documentation with tutorials and step-by-step guides
- **claude.md** (lowercase): Extended technical documentation for developers, includes architecture decisions and tips
- **CLAUDE.md** (this file): Guidance for Claude Code instances working on the repository
- **plugins/*/README.md**: Individual plugin documentation for end users

Each serves a distinct audience and should not duplicate content.

## Important Constraints

- This is a demo repository - prioritize clarity over production patterns
- Keep code examples concise enough to be LinkedIn article-friendly (~50 lines)
- The plugin API should be intuitive for developers new to Claude Code
- Maintain the barrier to entry as low as possible
- No actual runtime/testing infrastructure exists - this is example code only
