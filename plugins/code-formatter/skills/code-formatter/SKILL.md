---
name: code-formatter
description: Format and beautify code snippets in various languages (JSON, JavaScript, TypeScript, Python). Use when the user asks to format, beautify, or clean up code, or needs consistent indentation or pretty-printing.
---

# Code Formatter

A specialized skill for formatting and beautifying code snippets across multiple programming languages.

## Capabilities

- Format JSON with proper indentation
- Normalize JavaScript code formatting
- Clean up TypeScript code structure
- Format Python code with consistent spacing
- Configurable indentation (default: 2 spaces)

## When to Use This Skill

Invoke this skill when:
- User asks to format, beautify, or clean up code
- Code needs consistent indentation
- JSON needs to be pretty-printed
- Code snippets lack proper formatting

## Supported Languages

- **JSON**: Full parsing and pretty-printing with error handling
- **JavaScript**: Basic indentation normalization
- **TypeScript**: Basic indentation normalization
- **Python**: Basic indentation normalization

## Usage Examples

**Example 1: Format JSON**
```
User: Can you format this JSON?
{"name":"demo","version":"1.0.0","author":"test"}

Result: Pretty-printed JSON with 2-space indentation
```

**Example 2: Custom Indentation**
```
User: Format this with 4 spaces
Input code → Formatted with 4-space indentation
```

## Implementation

This skill uses the Claude Agent SDK with Zod schema validation to ensure type-safe inputs and consistent behavior.
