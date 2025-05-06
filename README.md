# VisionCraft MCP Server

[![Website](https://img.shields.io/badge/Website-visioncraft.augmentedstartups.com-A08FFF)](https://visioncraft.augmentedstartups.com) [![GitHub](https://img.shields.io/badge/GitHub-VisionCraft--MCP-A08FFF)](https://github.com/augmentedstartups/visioncraft-mcp) [<img alt="Install in Claude Desktop" src="https://img.shields.io/badge/Claude_Desktop-Install_VisionCraft_MCP-A08FFF">](https://claude.ai/download)

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
Explain how YOLOv12 differs from previous versions. use visioncraft
```

```txt
What are the best approaches for real-time 3D object detection? use visioncraft
```

VisionCraft MCP provides:

- 🔍 **Specialized Knowledge**: Access to state-of-the-art computer vision information
- 🧠 **RAG-powered**: Retrieval Augmented Generation for accurate, contextual responses
- 🚀 **Latest Algorithms**: Stay updated with cutting-edge models and techniques
- 💡 **Expert Guidance**: Get implementation advice from computer vision specialists

## 🛠️ Getting Started

### Requirements

- Node.js >= v18.0.0
- Claude Desktop or another MCP-compatible client

### Install in Claude Desktop

Add this to your Claude Desktop `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "visioncraft": {
      "command": "node",
      "args": [
        "https://raw.githubusercontent.com/augmentedstartups/visioncraft-mcp/main/src/server.js"
      ]
    }
  }
}
```

### Install in Cursor

Add this to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "visioncraft": {
      "command": "node",
      "args": [
        "https://raw.githubusercontent.com/augmentedstartups/visioncraft-mcp/main/src/server.js"
      ]
    }
  }
}
```

### Install in Windsurf

Add this to your Windsurf MCP configuration file:

```json
{
  "mcpServers": {
    "visioncraft": {
      "command": "node",
      "args": [
        "https://raw.githubusercontent.com/augmentedstartups/visioncraft-mcp/main/src/server.js"
      ]
    }
  }
}
```

### Install in VS Code

Add this to your VS Code MCP configuration:

```json
{
  "servers": {
    "VisionCraft": {
      "type": "stdio",
      "command": "node",
      "args": [
        "https://raw.githubusercontent.com/augmentedstartups/visioncraft-mcp/main/src/server.js"
      ]
    }
  }
}
```

## 🧠 Knowledge Base Coverage

VisionCraft MCP provides expertise in:

### Object Detection
- YOLOv12 and earlier versions
- RT-DETR and DAB-DETR transformers
- CenterNet and keypoint-based approaches
- Ultralytics frameworks

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

## 🔍 Available Tools

- `vision-query`: Query the VisionCraft knowledge base for computer vision information
  - `query` (required): The search query about computer vision topics

## 🔮 Future Plans

- Extended knowledge base with proprietary algorithms
- API key authentication for premium features
- Custom knowledge base integration
- Expert consultation for implementation guidance

## 📄 License

MIT License

## 🚀 About VisionCraft

VisionCraft helps developers build computer vision applications using the latest and state-of-the-art algorithms, models, and frameworks. Our mission is to make advanced computer vision technology accessible to developers of all skill levels.

Visit [VisionCraft](https://www.augmentedstartups.com/vision-craft-opt-in) to learn more.

---

Made with ❤️ by [Augmented AI](https://augmentedstartups.com)

