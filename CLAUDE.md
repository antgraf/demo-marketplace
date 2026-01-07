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

- **.claude-plugin/marketplace.json**: Central registry that indexes all available plugins with metadata (name, version, description, source, category)
- **plugins/**: Directory containing individual plugin packages, each self-contained
- **plugins/*/. claude-plugin/plugin.json**: Individual plugin configuration defining skills, commands, agents, etc.
- Each plugin skill follows the **Agent pattern** from `@claude/sdk`

### Critical Files

1. `.claude-plugin/marketplace.json` - Required at repository root, discovered by Claude Code
2. `plugins/[plugin-name]/.claude-plugin/plugin.json` - Required for each plugin
3. `plugins/[plugin-name]/skill.ts` - The actual agent implementation

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

1. Create directory structure:
   ```
   plugins/your-plugin-name/
   ├── .claude-plugin/
   │   └── plugin.json
   ├── skill.ts
   ├── package.json (optional)
   └── README.md
   ```

2. Create `.claude-plugin/plugin.json`:
   ```json
   {
     "name": "your-plugin-name",
     "version": "1.0.0",
     "description": "What it does",
     "skills": [
       {
         "name": "your-plugin-name",
         "description": "Skill description",
         "entrypoint": "../skill.ts"
       }
     ]
   }
   ```

3. Implement `skill.ts` following the Agent pattern (see code-formatter)

4. Register in `.claude-plugin/marketplace.json`:
   ```json
   {
     "plugins": [
       {
         "name": "your-plugin-name",
         "description": "Brief description",
         "version": "1.0.0",
         "source": "your-plugin-name",
         "category": "productivity"
       }
     ]
   }
   ```

### Marketplace Configuration

In `.claude-plugin/marketplace.json`:
- `name`: Unique marketplace identifier (kebab-case)
- `owner`: Object with `name` (required) and `email` (optional)
- `metadata.pluginRoot`: Base directory for plugin sources (e.g., "./plugins")
- `plugins[].name`: Plugin identifier users install with
- `plugins[].source`: Relative path from pluginRoot to plugin directory
- `plugins[].category`: One of: development, productivity, security, learning, testing

Valid categories: development, productivity, security, learning, testing, database, deployment, monitoring, documentation

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
