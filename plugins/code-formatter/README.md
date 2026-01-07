# Code Formatter Plugin

A simple demonstration plugin for Claude Code that formats code snippets.

## Features

- Format JSON, JavaScript, TypeScript, and Python code
- Configurable indentation
- Clean, simple API

## Usage

Once installed, you can invoke the formatter in Claude Code:

```
Can you format this JSON for me?
{"name":"demo","version":"1.0.0"}
```

## Installation

```bash
# Add the marketplace
/plugin marketplace add antgraf/demo-marketplace

# Install this plugin
/plugin install code-formatter@demo-marketplace
```

## Example

**Input:**
```javascript
function hello(){console.log("Hello World");}
```

**Output:**
```javascript
function hello(){
  console.log("Hello World");
}
```

## Configuration

The plugin accepts:
- `code`: The code to format (required)
- `language`: One of: javascript, typescript, python, json (required)
- `indentSize`: Spaces for indentation (optional, default: 2)
