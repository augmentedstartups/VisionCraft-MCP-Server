import { McpServer } from "@modelcontextprotocol/sdk/dist/esm/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/dist/esm/server/stdio.js";
import fetch from 'node-fetch';
import { z } from "zod";

// Constants
const ARIA_SERVER_URL = "https://visioncraft.augmentedstartups.com/rag-query"; // Production URL
// const ARIA_SERVER_URL = "http://localhost:8000/rag-query"; // Local development URL

// Simple logger setup - IMPORTANT: All logs must go to stderr, not stdout
const logger = {
  info: (message) => console.error(`[INFO] ${message}`),
  error: (message) => console.error(`[ERROR] ${message}`),
  debug: (message) => console.error(`[DEBUG] ${message}`)
};

/**
 * Query the VisionCraft knowledge base using the ARIA server's RAG endpoint
 */
async function queryVisionCraftKnowledge(query) {
  try {
    logger.info(`Querying ARIA server with: ${query}`);
    
    const response = await fetch(ARIA_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        top_k: 5
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      logger.error(`ARIA server error: ${response.status} ${errorText}`);
      throw new Error(`ARIA server returned status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
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
    
    // Return properly formatted content for Claude - CORRECT FORMAT
    return {
      results: formattedResults,
      // Claude expects content as an array of objects with type:"text" and text property
      content: formattedResults.map(result => ({ 
        type: "text",
        text: result.text 
      }))
    };
  } catch (error) {
    logger.error(`Error in queryVisionCraftKnowledge: ${error.message}`);
    throw error;
  }
}

// Create MCP server
const server = new McpServer({
  name: "visioncraft",
  version: "1.0.4",
  capabilities: {
    resources: {},
    tools: {},
  },
  prompt: `You are connected to the VisionCraft computer vision knowledge base.
VisionCraft helps developers build computer vision applications using state-of-the-art algorithms, models, and frameworks.
You can use the vision-query tool to search for information about computer vision topics.

- YOLOv12: Latest versions of the YOLO object detection framework
- RT-DETR: Real-time detection transformer
- DAB-DETR: Dynamic anchor boxes for DETR
- CenterNet: Object detection with keypoint triplets
- Ultralytics: Creators of YOLOv8 and other CV tools

# Segmentation
- SAM/SAM2: Meta's Segment Anything Model and its successor
- FastSAM: Faster version of the Segment Anything Model
- MobileSAM: Mobile-optimized version of SAM
- EfficientSAM: Efficient implementation of SAM
- DAM4SAM: Domain adaptation for SAM
- Mask3D: 3D instance segmentation

# 3D Vision
- OpenPCDet: Framework for 3D point cloud detection
- PV-RCNN: Point-voxel feature set abstraction for 3D object detection
- PointNet2: Deep hierarchical feature learning on point sets
- Det3D: 3D object detection framework
- Group-Free-3D: Group-free 3D object detection
- MVGFormer: Multi-view geometry transformer

# Vision-Language Models
- Florence-2: Vision-language model by Microsoft
- Qwen2.5-VL: Multimodal vision-language model
- SpatialLM: Spatial language model
- FVLM: Foundation vision-language models

# Specialized Computer Vision
- OVTR: Occupancy and velocity transformer
- DeepStream: NVIDIA's streaming analytics toolkit
- MobileNetV4: Efficient mobile vision architecture
- Shape-of-Motion: Motion-based perception
- Event-based Vision: Neuromorphic vision systems
- ML-Depth-Pro: Depth estimation techniques
- SynthMoCap: Synthetic motion capture

# Frameworks & Tools
- Supervision: Roboflow's computer vision toolkit
- CrewAI: Framework for orchestrating AI agents
- OpenAI Agents: Python SDK for AI agents
- MCP: Model Context Protocol for AI assistants
`



});

// Register the vision-query tool
server.tool(
  "vision-query",
  "Query the VisionCraft knowledge base for information about computer vision topics.",
  {
    query: z.string().describe("The query to search for in the VisionCraft knowledge base.")
  },
  async ({ query }) => {
    try {
      logger.info(`Handling vision-query: ${query}`);
      return await queryVisionCraftKnowledge(query);
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

// Keep the process alive
process.stdin.resume();
