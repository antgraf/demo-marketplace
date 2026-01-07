# Claude Code Marketplace Demo

A demonstration marketplace for Claude Code plugins, showcasing how to build and distribute custom skills for Claude Code.

**Repository**: https://github.com/antgraf/demo-marketplace

## Quick Start

```bash
# Add this marketplace to Claude Code
/plugin marketplace add antgraf/demo-marketplace

# Install the code formatter plugin
/plugin install code-formatter@demo-marketplace
```

That's it! No cloning needed - Claude Code pulls plugins directly from GitHub.

## What is This?

Claude Code is an AI-powered coding assistant that can be extended through custom plugins (skills). This repository demonstrates a simple marketplace structure for organizing and sharing these plugins, perfect for understanding the plugin architecture.

## Repository Structure

```
demo-marketplace/
├── .claude-plugin/
│   └── marketplace.json       # Marketplace registry (required)
├── plugins/                   # Plugin directory
│   └── code-formatter/        # Sample plugin
│       ├── .claude-plugin/
│       │   └── plugin.json    # Plugin configuration (required)
│       ├── skill.ts           # Main plugin code
│       ├── package.json       # Plugin metadata
│       └── README.md          # Plugin documentation
├── README.md                  # This file
├── CLAUDE.md                  # Claude Code guidance
└── LICENSE                    # MIT License
```

## Sample Plugin: Code Formatter

The included `code-formatter` plugin demonstrates:

- **Clear API Design**: Uses Zod schemas for type-safe input validation
- **Multi-language Support**: Handles JSON, JavaScript, TypeScript, and Python
- **Configurable Options**: Customizable indentation settings
- **Error Handling**: Graceful handling of invalid input

### Key Components

```typescript
// 1. Define the agent
const formatterAgent = new Agent({
  name: "code-formatter",
  description: "Format and beautify code snippets",

  // 2. Define input schema with Zod
  inputSchema: z.object({
    code: z.string(),
    language: z.enum(["javascript", "typescript", "python", "json"]),
    indentSize: z.number().optional().default(2),
  }),

  // 3. Implement the logic
  async run(input) {
    // Your formatting logic here
    return { formatted, message };
  },
});
```

## Creating Your Own Plugin

### Step 1: Set Up Plugin Structure

```bash
plugins/
└── your-plugin-name/
    ├── .claude-plugin/
    │   └── plugin.json   # Plugin configuration (required)
    ├── skill.ts          # Main agent implementation
    ├── package.json      # Metadata and dependencies
    └── README.md         # Documentation
```

Create `.claude-plugin/plugin.json`:
```json
{
  "name": "your-plugin-name",
  "version": "1.0.0",
  "description": "What your plugin does",
  "skills": [
    {
      "name": "your-plugin-name",
      "description": "Skill description",
      "entrypoint": "../skill.ts"
    }
  ]
}
```

### Step 2: Implement Your Agent

```typescript
import { Agent, z } from "@claude/sdk";

const myAgent = new Agent({
  name: "my-plugin",
  description: "What your plugin does",
  inputSchema: z.object({
    // Define your inputs
  }),
  async run(input) {
    // Your logic here
    return result;
  },
});

export default myAgent;
```

### Step 3: Register in Marketplace

Add your plugin to `.claude-plugin/marketplace.json`:

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

The `source` field uses the plugin directory name (relative to `pluginRoot` in marketplace metadata).

## Installation & Usage

Add this marketplace and install plugins:

```bash
# Add the marketplace
/plugin marketplace add antgraf/demo-marketplace

# List available plugins
/plugin list

# Install a specific plugin
/plugin install code-formatter@demo-marketplace

# Remove the marketplace (and its plugins)
/plugin marketplace remove demo-marketplace
```

## Best Practices

1. **Clear Descriptions**: Make your agent's purpose immediately obvious
2. **Type Safety**: Use Zod schemas for input validation
3. **Error Handling**: Provide helpful error messages
4. **Documentation**: Include usage examples and API docs
5. **Semantic Versioning**: Follow semver for version numbers

## Contributing

Contributions are welcome! To add your plugin:

1. Fork the repository: https://github.com/antgraf/demo-marketplace
2. Create a new plugin in the `plugins/` directory
3. Follow the structure and conventions shown in `code-formatter`
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Learn More

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk)
- See [claude.md](claude.md) for Claude Code specific integration details

## Use Cases

This marketplace approach enables:
- **Community Extensions**: Share useful skills with other developers
- **Team-Specific Tools**: Build internal tools for your organization
- **Experimentation**: Try new AI-powered workflows
- **Integration**: Connect Claude Code with your existing tools

---

Built as a demonstration for educational purposes. Perfect for understanding how to extend Claude Code with custom functionality.
