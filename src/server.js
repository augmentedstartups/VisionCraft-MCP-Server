#!/usr/bin/env node

// Import dependencies using dynamic import to maintain ESM compatibility
import fetch from 'node-fetch';
import { z } from "zod";

// Dynamic imports for SDK at top level
const { McpServer } = await import('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = await import('@modelcontextprotocol/sdk/server/stdio.js');

// Parse command line arguments for API key
const args = process.argv.slice(2);
const apiKeyIndex = args.indexOf('--api-key');
if (apiKeyIndex !== -1 && apiKeyIndex + 1 < args.length) {
  process.env.VC_API_KEY = args[apiKeyIndex + 1];
  console.error(`[API-KEY] Successfully parsed API key: ${process.env.VC_API_KEY.substring(0, 8)}...`);
} else {
  console.error(`[API-KEY] No --api-key argument found. Args: ${JSON.stringify(args)}`);
}

// Constants
const ARIA_SERVER_URL = "https://visioncraft.augmentedstartups.com/rag-query"; // Production URL
// const ARIA_SERVER_URL = "http://localhost:8000/rag-query"; // Local development URL

/**
 * Query the VisionCraft knowledge base using the ARIA server's RAG endpoint
 */
async function queryVisionCraftKnowledge(query) {
  try {
    logger.info(`Querying ARIA server with: ${query}`);
    logger.debug(`Sending request to: ${ARIA_SERVER_URL}`); // Log URL
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Add API key header if available
    if (process.env.VC_API_KEY) {
      headers['X-VC-API-Key'] = process.env.VC_API_KEY;
      logger.debug(`Using API key: ${process.env.VC_API_KEY.substring(0, 8)}...`);
    } else {
      logger.warn('No API key found - requests may be rejected');
    }
    
    const response = await fetch(ARIA_SERVER_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: query,
        top_k: 5,
        session_id: `mcp-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}` // Generate a unique session ID
      })
    });
    
    logger.debug(`ARIA server response status: ${response.status}`); // Log status
    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`ARIA server error: ${response.status} ${errorText}`);
      throw new Error(`ARIA server returned status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    logger.debug(`ARIA server response data: ${JSON.stringify(data, null, 2)}`); // Log full response data
    
    if (data.status === 'error') {
      logger.error(`ARIA server reported error: ${data.message}`);
      throw new Error(`ARIA server error: ${data.message}`);
    }
    
    logger.info(`Retrieved ${data.results.length} results from ARIA server`);
    
    // Format results for Claude
    const formattedResults = data.results.map(result => ({
      text: result.text,
      score: result.score,
      source: result.source || "Unknown"
    }));
    logger.debug(`Formatted results: ${JSON.stringify(formattedResults, null, 2)}`); // Log formatted results
    
    // Return properly formatted content for Claude - CORRECT FORMAT
    const finalResponse = {
      results: formattedResults,
      // Claude expects content as an array of objects with type:"text" and text property
      content: formattedResults.map(result => ({ 
        type: "text",
        text: result.text 
      }))
    };
    logger.debug(`Final response for MCP: ${JSON.stringify(finalResponse, null, 2)}`); // Log final response structure
    return finalResponse;
  } catch (error) {
    logger.error(`Error in queryVisionCraftKnowledge: ${error.message}`);
    throw error;
  }
}

// Simple logger setup - IMPORTANT: All logs must go to stderr, not stdout
const logger = {
  info: (message) => console.error(`[INFO] ${message}`),
  warn: (message) => console.error(`[WARN] ${message}`),
  error: (message) => console.error(`[ERROR] ${message}`),
  debug: (message) => console.error(`[DEBUG] ${message}`)
};

// Create MCP server
const server = new McpServer({
  name: "visioncraft",
  version: "1.0.9",
  capabilities: {
    resources: {},
    tools: {},
  },
  prompt: `You are an AI Coding agent called VisionCraft that retrieves context about the users question requested codebase or repo. You have over 100K libraries and codebases in your knowledge base. 
In your responses do not mention your name or what you do, unless explicitly asked for.
  `
});

// Register the vision-query tool
server.tool(
  "vision-query",
  "Query the VisionCraft knowledge base for information about AI topics.",
  {
    query: z.string().describe("The query to search for in the VisionCraft knowledge base.")
  },
  async ({ query }) => {
    try {
      logger.info(`Handling vision-query: ${query}`);
      const result = await queryVisionCraftKnowledge(query); // Capture result
      logger.info(`Successfully handled vision-query for: ${query}`);
      logger.debug(`Returning result: ${JSON.stringify(result, null, 2)}`); // Log the result being returned
      return result; // Return captured result
    } catch (error) {
      logger.error(`Tool handler error: ${error.message}`);
      throw error;
    }
  }
);

// Start the server
logger.info("Starting VisionCraft MCP Server...");
const transport = new StdioServerTransport();
server.connect(transport);
logger.info("VisionCraft MCP Server running on stdio");

// Keep the process alive (optional, stdio transport might handle this)
// process.stdin.resume();
