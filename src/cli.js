#!/usr/bin/env node

import { startServer } from './server.js';

// Check if help is requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  printHelp();
  process.exit(0);
}

// Start the server
startServer();

// Keep the process alive
process.stdin.resume();

function printHelp() {
  console.log(`
VisionCraft MCP Server - Computer Vision Knowledge Base for Claude

Usage:
  visioncraft-mcp --api-key YOUR_API_KEY

Options:
  --api-key KEY       Your VisionCraft API key (required)
  --help, -h          Show this help message

Description:
  This MCP server connects Claude and other AI assistants to the
  VisionCraft computer vision knowledge base, providing up-to-date
  information about computer vision technologies, algorithms, and frameworks.

  Get your API key from: https://visioncraft-app.augmentedstartups.com
  
  Use 'use visioncraft' in your Claude prompts to access this knowledge.
`);
}
