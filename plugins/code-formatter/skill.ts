/**
 * Code Formatter Plugin for Claude Code
 * A simple example demonstrating how to create custom skills for Claude Code
 */

import { Agent, z } from "@claude/sdk";

// Define the formatter agent with a clear description
const formatterAgent = new Agent({
  name: "code-formatter",
  description: "Format and beautify code snippets in various languages",

  // Define input schema using Zod
  inputSchema: z.object({
    code: z.string().describe("The code to format"),
    language: z.enum(["javascript", "typescript", "python", "json"])
      .describe("Programming language of the code"),
    indentSize: z.number().optional().default(2)
      .describe("Number of spaces for indentation"),
  }),

  // Main execution logic
  async run(input) {
    const { code, language, indentSize } = input;

    // Simple formatting logic for demonstration
    let formatted = code.trim();

    switch (language) {
      case "json":
        try {
          const parsed = JSON.parse(formatted);
          formatted = JSON.stringify(parsed, null, indentSize);
        } catch (e) {
          throw new Error("Invalid JSON syntax");
        }
        break;

      case "javascript":
      case "typescript":
      case "python":
        // Basic indentation normalization
        const lines = formatted.split("\n");
        formatted = lines
          .map(line => line.trimStart())
          .join("\n" + " ".repeat(indentSize));
        break;
    }

    return {
      formatted,
      language,
      lineCount: formatted.split("\n").length,
      message: `Successfully formatted ${language} code`
    };
  },
});

export default formatterAgent;
