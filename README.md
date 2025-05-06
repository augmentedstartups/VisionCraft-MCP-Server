# VisionCraft MCP Server

[![Website](https://img.shields.io/badge/Website-visioncraft.augmentedstartups.com-A08FFF)](https://www.augmentedstartups.com/vision-craft-opt-in) [![GitHub](https://img.shields.io/badge/GitHub-VisionCraft--MCP-A08FFF)](https://github.com/augmentedstartups/VisionCraft-MCP-Server) [<img alt="Install in Claude Desktop" src="https://img.shields.io/badge/Claude_Desktop-Install_VisionCraft_MCP-A08FFF">](https://claude.ai/download)

## ❌ Without VisionCraft MCP

AI assistants struggle with computer vision and Gen-AI knowledge:

- ❌ Limited understanding of cutting-edge computer vision algorithms
- ❌ Outdated information on models released after training cutoff
- ❌ Generic answers that lack depth and technical accuracy
- ❌ No awareness of latest frameworks and tools

## ✅ With VisionCraft MCP

VisionCraft MCP delivers up-to-date, specialized computer vision and Gen-AI knowledge directly to Claude and other AI assistants.

Add `use visioncraft` to your prompt in Claude:

```txt
Give me the code for OpenAI Agents SDK. Use visioncraft MCP
```

VisionCraft MCP provides:

- 🔍 **Specialized Knowledge**: Access to state-of-the-art computer vision and GenAI information
- 🧠 **RAG-powered**: Retrieval Augmented Generation for accurate, contextual responses
- 🚀 **Latest Algorithms**: Stay updated with cutting-edge models and techniques
- 💡 **Expert Guidance**: Get implementation advice from computer vision and GenAI specialists

## 🛠️ Getting Started

### Requirements

- Node.js >= v18.0.0
- Claude Desktop or another MCP-compatible client

### Install in MCP-compatible Clients (Claude Desktop, Cursor, Windsurf, VS Code/Cline)

Add the following configuration to your respective MCP settings file.
For Claude Desktop, this is typically `claude_desktop_config.json`.
For VS Code, you might use a general MCP configuration file or specific extension settings.
For Windsurf, Cursor, and other Cline-like tools, refer to their documentation for the MCP configuration location.

**Note:** While the command and arguments are generally the same, the top-level key for MCP servers might vary (e.g., `mcpServers` or `servers`). The example below uses `mcpServers`. Adjust if your specific client requires a different key (like `servers` for some VS Code setups).

```json
{
  "mcpServers": {
    "visioncraft": {
      "command": "npx",
      "args": ["-y", "visioncraft-mcp@latest"]
    }
  }
}
```

### Alternative Installation Methods

<details>
<summary>Using Bun</summary>

```json
{
  "mcpServers": {
    "visioncraft": {
      "command": "bunx",
      "args": ["-y", "visioncraft-mcp@latest"]
    }
  }
}
```
</details>

<details>
<summary>Using Deno</summary>

```json
{
  "mcpServers": {
    "visioncraft": {
      "command": "deno",
      "args": ["run", "--allow-net", "npm:visioncraft-mcp"]
    }
  }
}
```
</details>

## 🧠 Knowledge Base Coverage

VisionCraft MCP provides expertise in Computer Vision and GenAI including:

### Object Detection
- YOLOv12 and earlier versions
- RT-DETR and DAB-DETR transformers
- CenterNet and keypoint-based approaches
- Ultralytics frameworks
- Roboflow supervision library

### Segmentation
- SAM/SAM2 (Segment Anything Model)
- FastSAM, MobileSAM, EfficientSAM
- Domain adaptation techniques
- 3D instance segmentation

### 3D Vision
- Point cloud detection frameworks
- Feature extraction for 3D objects
- Multi-view geometry transformers
- Real-time 3D detection systems

### Vision-Language Models
- Florence-2, Qwen2.5-VL
- Spatial language models
- Foundation vision-language models

### Specialized Computer Vision
- Occupancy and velocity transformers
- Event-based vision systems
- Depth estimation techniques
- Synthetic motion capture

### Agentic Frameworks
- OpenAI Agents SDK
- CrewAI

More libraries coming soon.

## 🔍 Available Tools

- `vision-query`: Query the VisionCraft knowledge base for computer vision and GenAI information
  - `query` (required): The search query about computer vision topics

## 🗺️ Roadmap & Monetization

VisionCraft MCP is actively evolving. We are currently in a **free testing phase** as we build out our core functionalities and gather user feedback. Our goal is to provide a powerful tool for developers working with Computer Vision and GenAI.

**Currently Available:**
- [x] Access to a foundational knowledge base covering key Computer Vision and GenAI topics (Object Detection, Segmentation, 3D Vision, Vision-Language Models, Agentic Frameworks like OpenAI Agents SDK & CrewAI).
- [x] `vision-query` tool for direct information retrieval via MCP.
- [x] Easy integration with MCP-compatible clients (Claude Desktop, Cursor, Windsurf, VS Code/Cline).

**In Progress / Near Term:**
- [ ] **Expanded Knowledge Domains**: Broadening coverage to include popular general programming frameworks, RAG-specific frameworks (e.g., LangChain, LlamaIndex), and other developer tools.
- [ ] **Enhanced Client Integration**: Deeper and more seamless integration with Claude Desktop, Cursor, and Windsurf, including client-specific optimizations and improved performance.
- [ ] **User Accounts & Personalized Experience**: Implementing mechanisms for user accounts and managing access, laying groundwork for personalized experiences.
- [ ] **Performance Optimizations**: Continuously improving response times and resource efficiency of the MCP server.

**Future Goals:**
- [ ] **Comprehensive Framework Support**: Aiming to cover a vast array of programming languages, libraries, and developer ecosystems.
- [ ] **Advanced RAG & Agentic Workflow Support**: Offering more sophisticated Retrieval Augmented Generation techniques and tools, along with support for building and understanding agentic workflows through the MCP.
- [ ] **Interactive Code Generation & Assistance**: Assisting with boilerplate code, debugging suggestions, and framework-specific snippets based on the expanded knowledge.
- [ ] **Custom Knowledge Base Integration**: Allowing users or enterprises to connect their own private knowledge bases for personalized assistance.

**Monetization Note:**
> VisionCraft MCP is currently **free** during development. We plan to introduce paid tiers in the future to support ongoing maintenance and expansion. Early users providing feedback will be valued as we shape our offerings.

## 📄 License

MIT License

## 🚀 About VisionCraft

VisionCraft helps developers build computer vision and GenAI applications using the latest and state-of-the-art algorithms, models, and frameworks. Our mission is to make advanced computer vision and GenAI technology accessible to developers of all skill levels.

Visit [VisionCraft](https://www.augmentedstartups.com/vision-craft-opt-in) to learn more.

---

Made with ❤️ by [Augmented AI](https://augmentedstartups.com)
