import { proxy } from "valtio";
import type { Theme, ThemeFilter } from "../types/theme";

// Mock themes data
export const mockThemes: Theme[] = [
  {
    id: "0",
    slug: "light",
    name: "Light Mode",
    description: "A vibrant cyberpunk-inspired theme with neon accents and dark backgrounds",
    author: "Horus Labs",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cyber",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
      }
    `,
    users: 1247,
    tags: ["light"],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "1",
    slug: "neon-dreams",
    name: "Neon Dreams",
    description: "A vibrant cyberpunk-inspired theme with neon accents and dark backgrounds",
    author: "CyberDesigner",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cyber",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(circle at top left, #ff00ff 0%, #00ffff 100%);
        border: 3px dashed #00ffff;
        box-shadow: 0 0 60px rgba(255, 0, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.4);
        transform: perspective(1000px) rotateX(2deg);
        backdrop-filter: blur(10px);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 45deg, #ff00ff, #00ffff, #ff00ff);
        border: 2px solid #fff;
        color: #000;
        text-shadow: 0 0 20px rgba(0, 255, 255, 1);
        box-shadow: 0 8px 16px rgba(0, 255, 255, 0.6);
        clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
      }
      .cr-app-title {
        color: #ffffff;
        font-family: 'Orbitron', monospace;
        text-transform: uppercase;
        letter-spacing: 3px;
        filter: drop-shadow(0 0 10px #00ffff);
      }
    `,
    users: 1247,
    tags: ["cyberpunk", "neon", "dark", "gaming"],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "2",
    slug: "minimal-white",
    name: "Minimal White",
    description: "Clean, minimal design with subtle shadows and modern typography",
    author: "MinimalMaster",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 10px, #f9fafb 10px, #f9fafb 20px);
        border: none;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
        border-radius: 30px;
        position: relative;
        overflow: hidden;
      }
      .cr-payment-method-button {
        background: linear-gradient(180deg, #111827 0%, #374151 100%);
        color: white;
        border-radius: 50px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(17, 24, 39, 0.4);
        border: 3px solid #e5e7eb;
      }
      .cr-app-title {
        color: #111827;
        font-family: 'Inter', sans-serif;
        font-weight: 300;
        line-height: 1.8;
      }
    `,
    users: 892,
    tags: ["minimal", "clean", "white", "modern"],
    createdAt: "2024-01-10T08:15:00Z",
    updatedAt: "2024-01-10T08:15:00Z",
  },
  {
    id: "3",
    slug: "forest-green",
    name: "Forest Green",
    description: "Nature-inspired theme with earthy greens and organic shapes",
    author: "NatureLover",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(120deg, #1a3a0f 0%, #2d5016 25%, #4a7c28 50%, #68cc34 75%, #7ee84b 100%);
        border: 5px ridge #68cc34;
        border-radius: 0;
        box-shadow: inset 0 0 50px rgba(42, 75, 25, 0.6), 0 15px 40px rgba(45, 80, 22, 0.5);
        transform: skewY(-1deg);
      }
      .cr-payment-method-button {
        background: radial-gradient(circle, #7ee84b 0%, #68cc34 50%, #4a7c28 100%);
        color: #1a3a0f;
        border-radius: 0;
        border: 3px double #2d5016;
        font-weight: 800;
        text-shadow: 1px 1px 2px #f0f8f0;
      }
      .cr-app-title {
        color: #c5e8b0;
        text-shadow: 2px 2px 4px rgba(29, 53, 15, 0.8);
        font-style: italic;
      }
    `,
    users: 543,
    tags: ["nature", "green", "organic", "eco"],
    createdAt: "2024-02-01T12:00:00Z",
    updatedAt: "2024-02-01T12:00:00Z",
  },
  {
    id: "4",
    slug: "corporate-blue",
    name: "Corporate Blue",
    description: "Professional theme for business applications",
    author: "BusinessDev",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 0deg at 50% 50%, #f8fafc 0deg, #e2e8f0 90deg, #cbd5e1 180deg, #e2e8f0 270deg, #f8fafc 360deg);
        border: 4px solid transparent;
        background-clip: padding-box;
        outline: 2px solid #3b82f6;
        outline-offset: 4px;
        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.1);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(90deg, #3b82f6 0px, #3b82f6 15px, #2563eb 15px, #2563eb 30px);
        color: white;
        clip-path: polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%);
        font-family: monospace;
        letter-spacing: 2px;
      }
    `,
    users: 2156,
    tags: ["business", "blue", "corporate"],
    createdAt: "2024-02-03T09:30:00Z",
    updatedAt: "2024-02-03T09:30:00Z",
  },
  {
    id: "5",
    slug: "sunset-orange",
    name: "Sunset Orange",
    description: "Warm sunset colors with gradient transitions",
    author: "ColorMaster",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=color",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(to bottom, #ff6b35 0%, #f7931e 20%, #fbb03b 40%, #ff8c42 60%, #ff6b35 80%, #f7931e 100%);
        border: 8px groove #ff6b35;
        border-radius: 50% 20% 50% 20%;
        box-shadow: 0 0 80px rgba(255, 107, 53, 0.7), inset 0 0 40px rgba(247, 147, 30, 0.3);
        animation: pulse 3s infinite;
      }
      .cr-payment-method-button {
        background: conic-gradient(from 90deg, #ff6b35, #fbb03b, #ff6b35);
        color: white;
        border-radius: 100px 0 100px 0;
        border: 4px solid #2d1b00;
        transform: scale(1.05);
        text-transform: lowercase;
      }
      .cr-app-title {
        color: #fff;
        text-shadow: 3px 3px 6px #2d1b00, -1px -1px 2px #fbb03b;
        font-weight: 900;
      }
    `,
    users: 789,
    tags: ["colorful", "warm", "orange", "gradient"],
    createdAt: "2024-01-18T14:20:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
  },
  {
    id: "6",
    slug: "midnight-purple",
    name: "Midnight Purple",
    description: "Deep purple theme with mystical vibes",
    author: "MysticDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-radial-gradient(circle at 30% 40%, #1a0033 0px, #2d004d 20px, #4d0080 40px, #1a0033 60px);
        border: 2px dotted #8b00ff;
        box-shadow: 0 0 100px rgba(139, 0, 255, 0.9), 0 0 200px rgba(77, 0, 128, 0.5);
        border-radius: 20px 5px 20px 5px;
        filter: brightness(1.1) contrast(1.2);
      }
      .cr-payment-method-button {
        background: linear-gradient(45deg, #8b00ff 25%, #4d0080 25%, #4d0080 50%, #8b00ff 50%, #8b00ff 75%, #4d0080 75%, #4d0080);
        background-size: 20px 20px;
        color: #e6d5ff;
        border: 3px outset #8b00ff;
        box-shadow: 0 0 25px #8b00ff;
      }
      .cr-app-title {
        color: #e6d5ff;
        font-variant: small-caps;
        letter-spacing: 4px;
      }
    `,
    users: 1523,
    tags: ["dark", "purple", "mystical"],
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-01-12T11:00:00Z",
  },
  {
    id: "7",
    slug: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Calming ocean-inspired blues and teals",
    author: "SeaScape",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(90deg, rgba(0,105,148,0.8) 0%, rgba(0,168,204,0.8) 25%, rgba(13,206,218,0.8) 50%, rgba(0,168,204,0.8) 75%, rgba(0,105,148,0.8) 100%);
        border: 6px wavy #00d4ff;
        border-radius: 60px;
        box-shadow: 0 25px 50px rgba(0, 212, 255, 0.4), inset 0 -10px 30px rgba(0, 105, 148, 0.5);
        backdrop-filter: blur(5px) saturate(180%);
      }
      .cr-payment-method-button {
        background: radial-gradient(ellipse at center, #0dceda 0%, #00a8cc 50%, #006994 100%);
        color: #fff;
        border-radius: 8px;
        border: 3px solid #e6f9ff;
        box-shadow: 0 6px 20px rgba(13, 206, 218, 0.6);
        font-weight: 700;
      }
      .cr-app-title {
        color: #e6f9ff;
        filter: drop-shadow(0 2px 4px rgba(0, 61, 77, 0.8));
      }
    `,
    users: 2034,
    tags: ["blue", "calm", "ocean", "light"],
    createdAt: "2024-01-05T09:45:00Z",
    updatedAt: "2024-01-05T09:45:00Z",
  },
  {
    id: "8",
    slug: "retro-arcade",
    name: "Retro Arcade",
    description: "80s arcade-inspired pixel perfect theme",
    author: "PixelPro",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pixel",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(0deg, #1a1a2e 0px, #1a1a2e 2px, #0e0e1f 2px, #0e0e1f 4px);
        border: 6px double #ff007f;
        box-shadow: 12px 12px 0 #00ff9f, -12px -12px 0 #ff007f, 0 0 40px rgba(255, 0, 127, 0.5);
        border-radius: 0;
        image-rendering: pixelated;
      }
      .cr-payment-method-button {
        background: linear-gradient(to bottom, #ff007f 0%, #ff007f 45%, #000 45%, #000 55%, #ff007f 55%, #ff007f 100%);
        color: white;
        border: 4px outset #fff;
        box-shadow: 4px 4px 0 #00ff9f;
        clip-path: polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%);
      }
      .cr-app-title {
        color: #00ff9f;
        font-family: 'Press Start 2P', monospace;
        text-shadow: 2px 2px 0 #ff007f, 4px 4px 0 rgba(0, 0, 0, 0.5);
      }
    `,
    users: 3421,
    tags: ["retro", "gaming", "80s", "arcade"],
    createdAt: "2024-01-08T16:30:00Z",
    updatedAt: "2024-01-08T16:30:00Z",
  },
  {
    id: "9",
    slug: "cherry-blossom",
    name: "Cherry Blossom",
    description: "Soft pink theme inspired by spring flowers",
    author: "BloomDesign",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(circle at 20% 80%, #ffe5ec 0%, #ffb3c6 30%, #ff8fab 60%, #ff5c8a 100%);
        border: 5px solid transparent;
        border-image: linear-gradient(45deg, #ff5c8a, #ffb3c6, #ffe5ec, #ffb3c6, #ff5c8a) 1;
        border-radius: 40px;
        box-shadow: 0 10px 40px rgba(255, 92, 138, 0.4), inset 0 0 20px rgba(255, 229, 236, 0.6);
      }
      .cr-payment-method-button {
        background: linear-gradient(135deg, #ff5c8a 0%, #ff8fab 50%, #ff5c8a 100%);
        color: white;
        border-radius: 25px 5px 25px 5px;
        border: 2px solid #5c0a2e;
        box-shadow: 0 5px 15px rgba(255, 92, 138, 0.5);
      }
      .cr-app-title {
        color: #5c0a2e;
        font-style: oblique;
        text-decoration: underline wavy #ff5c8a;
      }
    `,
    users: 1876,
    tags: ["pink", "soft", "floral", "light"],
    createdAt: "2024-01-22T13:15:00Z",
    updatedAt: "2024-01-22T13:15:00Z",
  },
  {
    id: "10",
    slug: "industrial-gray",
    name: "Industrial Gray",
    description: "Modern industrial design with metallic accents",
    author: "MetalWorks",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(90deg, #2c2c2c 0px, #3d3d3d 5px, #4f4f4f 10px, #3d3d3d 15px, #2c2c2c 20px);
        border: 8px ridge #8c8c8c;
        box-shadow: 0 15px 35px rgba(44, 44, 44, 0.8), inset 0 5px 15px rgba(140, 140, 140, 0.3);
        border-radius: 2px;
        filter: grayscale(20%) contrast(1.1);
      }
      .cr-payment-method-button {
        background: linear-gradient(180deg, #8c8c8c 0%, #6c757d 50%, #4f4f4f 100%);
        color: white;
        border: 3px inset #2c2c2c;
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(108, 117, 125, 0.4);
        text-transform: uppercase;
        font-family: 'Courier New', monospace;
      }
      .cr-app-title {
        color: #e0e0e0;
        letter-spacing: 1px;
        opacity: 0.95;
      }
    `,
    users: 945,
    tags: ["gray", "industrial", "modern", "minimal"],
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
  },
  {
    id: "11",
    slug: "gold-luxury",
    name: "Gold Luxury",
    description: "Premium gold and black luxury theme",
    author: "LuxuryDesigns",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luxury",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(ellipse at bottom, #000000 0%, #1a1a1a 50%, #0a0a0a 100%);
        border: 4px solid #ffd700;
        box-shadow: 0 0 60px rgba(255, 215, 0, 0.6), inset 0 0 80px rgba(255, 237, 78, 0.1), 0 20px 50px rgba(0, 0, 0, 0.9);
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        backdrop-filter: brightness(0.8);
      }
      .cr-payment-method-button {
        background: linear-gradient(to right, #ffd700 0%, #ffed4e 25%, #ffd700 50%, #ffed4e 75%, #ffd700 100%);
        background-size: 200% auto;
        color: #000;
        border: 3px double #000;
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.7), inset 0 1px 3px rgba(255, 255, 255, 0.3);
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      .cr-app-title {
        color: #ffd700;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8);
        font-weight: 600;
      }
    `,
    users: 2789,
    tags: ["luxury", "gold", "dark", "premium"],
    createdAt: "2024-01-14T15:40:00Z",
    updatedAt: "2024-01-14T15:40:00Z",
  },
  {
    id: "12",
    slug: "mint-fresh",
    name: "Mint Fresh",
    description: "Refreshing mint green with clean lines",
    author: "FreshDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 180deg at 50% 50%, #d7fff1 0deg, #abebc6 72deg, #7dcea0 144deg, #abebc6 216deg, #d7fff1 288deg, #d7fff1 360deg);
        border: 3px dotted #52be80;
        border-radius: 35px;
        box-shadow: 0 15px 45px rgba(82, 190, 128, 0.3), inset 0 0 25px rgba(171, 235, 198, 0.4);
        transform: rotate(-0.5deg);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(45deg, #52be80 0px, #52be80 10px, #7dcea0 10px, #7dcea0 20px);
        color: white;
        border-radius: 12px;
        border: 2px solid #145a32;
        box-shadow: 0 4px 12px rgba(82, 190, 128, 0.5);
      }
      .cr-app-title {
        color: #145a32;
        font-weight: 500;
        line-height: 1.7;
      }
    `,
    users: 1234,
    tags: ["green", "mint", "fresh", "light"],
    createdAt: "2024-01-28T09:20:00Z",
    updatedAt: "2024-01-28T09:20:00Z",
  },
  {
    id: "13",
    slug: "volcanic-red",
    name: "Volcanic Red",
    description: "Intense red theme with fiery energy",
    author: "FireForge",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(circle at 50% 120%, #c70000 0%, #8b0000 30%, #4a0000 60%, #1a0000 100%);
        border: 5px solid #ff0000;
        box-shadow: 0 0 100px rgba(255, 0, 0, 0.9), 0 0 150px rgba(199, 0, 0, 0.6), inset 0 0 60px rgba(139, 0, 0, 0.5);
        border-radius: 10px;
        filter: brightness(1.1) saturate(1.4);
        animation: flicker 2s infinite alternate;
      }
      .cr-payment-method-button {
        background: linear-gradient(to top, #4a0000 0%, #8b0000 40%, #ff0000 100%);
        color: white;
        border: 3px solid #ffcccc;
        box-shadow: 0 0 30px rgba(255, 0, 0, 0.8), inset 0 0 10px rgba(255, 0, 0, 0.3);
        clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
        text-shadow: 0 0 5px rgba(255, 0, 0, 1);
      }
      .cr-app-title {
        color: #ffcccc;
        text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
        font-weight: 700;
      }
    `,
    users: 1567,
    tags: ["red", "dark", "intense", "fire"],
    createdAt: "2024-01-19T12:30:00Z",
    updatedAt: "2024-01-19T12:30:00Z",
  },
  {
    id: "14",
    slug: "lavender-dream",
    name: "Lavender Dream",
    description: "Soft lavender with dreamy aesthetics",
    author: "DreamWeaver",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dream",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-radial-gradient(circle at 60% 40%, #f3e5f5 0px, #e1bee7 30px, #ce93d8 60px, #e1bee7 90px);
        border: 6px double #ab47bc;
        border-radius: 50px 10px 50px 10px;
        box-shadow: 0 20px 60px rgba(171, 71, 188, 0.4), inset 0 0 40px rgba(243, 229, 245, 0.6);
        backdrop-filter: blur(8px);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 0deg, #ab47bc, #ce93d8, #ab47bc);
        color: white;
        border-radius: 30px;
        border: 3px solid #4a148c;
        box-shadow: 0 10px 30px rgba(171, 71, 188, 0.6);
        transform: perspective(500px) rotateX(5deg);
      }
      .cr-app-title {
        color: #4a148c;
        font-style: italic;
        letter-spacing: 1.5px;
        filter: drop-shadow(0 2px 3px rgba(171, 71, 188, 0.3));
      }
    `,
    users: 2145,
    tags: ["purple", "soft", "dreamy", "light"],
    createdAt: "2024-01-11T14:50:00Z",
    updatedAt: "2024-01-11T14:50:00Z",
  },
  {
    id: "15",
    slug: "arctic-blue",
    name: "Arctic Blue",
    description: "Cool arctic theme with icy blues",
    author: "PolarDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(to right, rgba(224,242,241,0.9) 0%, rgba(178,223,219,0.9) 25%, rgba(128,203,196,0.9) 50%, rgba(178,223,219,0.9) 75%, rgba(224,242,241,0.9) 100%);
        border: 5px solid #4db6ac;
        border-radius: 25px;
        box-shadow: 0 0 50px rgba(77, 182, 172, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(15px) brightness(1.2);
      }
      .cr-payment-method-button {
        background: linear-gradient(135deg, transparent 0%, #4db6ac 50%, transparent 100%);
        background-color: #80cbc4;
        color: white;
        border: 3px solid #004d40;
        border-radius: 18px;
        box-shadow: 0 6px 18px rgba(77, 182, 172, 0.5);
        font-weight: 600;
      }
      .cr-app-title {
        color: #004d40;
        text-decoration: underline dotted #4db6ac;
      }
    `,
    users: 987,
    tags: ["blue", "cool", "arctic", "light"],
    createdAt: "2024-01-26T11:10:00Z",
    updatedAt: "2024-01-26T11:10:00Z",
  },
  {
    id: "16",
    slug: "mocha-brown",
    name: "Mocha Brown",
    description: "Warm coffee-inspired brown tones",
    author: "CafeStyle",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(135deg, #5d4037 0px, #795548 25px, #8d6e63 50px, #795548 75px, #5d4037 100px);
        border: 6px groove #a1887f;
        box-shadow: 0 10px 40px rgba(93, 64, 55, 0.7), inset 0 5px 20px rgba(161, 136, 127, 0.3);
        border-radius: 5px;
        filter: sepia(10%);
      }
      .cr-payment-method-button {
        background: radial-gradient(circle, #8d6e63 0%, #6d4c41 70%, #5d4037 100%);
        color: #fff;
        border: 4px outset #a1887f;
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(109, 76, 65, 0.6);
        text-transform: capitalize;
      }
      .cr-app-title {
        color: #efebe9;
        font-family: Georgia, serif;
        line-height: 1.6;
      }
    `,
    users: 756,
    tags: ["brown", "warm", "coffee", "cozy"],
    createdAt: "2024-01-29T08:40:00Z",
    updatedAt: "2024-01-29T08:40:00Z",
  },
  {
    id: "17",
    slug: "electric-yellow",
    name: "Electric Yellow",
    description: "Bold yellow theme with high energy",
    author: "BoltDesigns",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bolt",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(45deg, #fff9c4 0%, #ffeb3b 15%, #fdd835 30%, #ffeb3b 45%, #fff9c4 60%, #ffeb3b 75%, #fdd835 90%, #ffeb3b 100%);
        background-size: 200% 200%;
        border: 8px solid #f9a825;
        box-shadow: 0 0 80px rgba(249, 168, 37, 0.8), inset 0 0 40px rgba(255, 249, 196, 0.4);
        animation: slide 5s linear infinite;
        border-radius: 15px;
      }
      .cr-payment-method-button {
        background: repeating-conic-gradient(from 0deg, #f9a825 0deg, #fdd835 30deg, #f9a825 60deg);
        color: #000;
        border: 4px double #1a1a00;
        box-shadow: 0 0 40px rgba(249, 168, 37, 0.9);
        font-weight: 900;
        text-transform: uppercase;
        clip-path: polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%);
      }
      .cr-app-title {
        color: #1a1a00;
        text-shadow: 1px 1px 2px #fdd835, -1px -1px 2px #fff9c4;
        font-weight: 800;
      }
    `,
    users: 1432,
    tags: ["yellow", "bright", "energy", "bold"],
    createdAt: "2024-01-17T13:25:00Z",
    updatedAt: "2024-01-17T13:25:00Z",
  },
  {
    id: "18",
    slug: "slate-modern",
    name: "Slate Modern",
    description: "Contemporary slate gray design",
    author: "ModernUI",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(to bottom right, #1e293b 0%, #334155 50%, #1e293b 100%);
        border: 2px solid #475569;
        border-radius: 20px;
        box-shadow: 0 25px 50px rgba(30, 41, 59, 0.6), 0 0 0 1px rgba(71, 85, 105, 0.3);
        backdrop-filter: blur(20px);
      }
      .cr-payment-method-button {
        background: linear-gradient(90deg, #334155 0%, #475569 50%, #334155 100%);
        color: white;
        border-radius: 10px;
        border: 2px solid #cbd5e1;
        box-shadow: 0 8px 20px rgba(71, 85, 105, 0.4), inset 0 1px 3px rgba(203, 213, 225, 0.1);
        font-family: 'Helvetica Neue', sans-serif;
      }
      .cr-app-title {
        color: #cbd5e1;
        letter-spacing: 0.5px;
        opacity: 0.98;
      }
    `,
    users: 3210,
    tags: ["modern", "gray", "dark", "minimal"],
    createdAt: "2024-01-06T10:30:00Z",
    updatedAt: "2024-01-06T10:30:00Z",
  },
  {
    id: "19",
    slug: "candy-pop",
    name: "Candy Pop",
    description: "Sweet candy-colored theme with playful vibes",
    author: "SweetDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(circle at 30% 30%, #fce4ec 0%, #f8bbd0 20%, #f48fb1 40%, #f8bbd0 60%, #fce4ec 80%, #f8bbd0 100%);
        border: 8px dotted #ec407a;
        border-radius: 60px 20px 60px 20px;
        box-shadow: 0 15px 50px rgba(236, 64, 122, 0.5), inset 0 0 50px rgba(252, 228, 236, 0.7);
        transform: rotate(1deg);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 45deg, #ec407a, #f48fb1, #f8bbd0, #f48fb1, #ec407a);
        color: white;
        border-radius: 100px;
        border: 5px solid #880e4f;
        box-shadow: 0 12px 35px rgba(236, 64, 122, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.3);
        font-weight: 700;
        text-shadow: 2px 2px 4px rgba(136, 14, 79, 0.6);
      }
      .cr-app-title {
        color: #880e4f;
        font-style: oblique;
        text-decoration: overline;
      }
    `,
    users: 2678,
    tags: ["pink", "candy", "playful", "colorful"],
    createdAt: "2024-01-13T15:00:00Z",
    updatedAt: "2024-01-13T15:00:00Z",
  },
  {
    id: "20",
    slug: "sage-garden",
    name: "Sage Garden",
    description: "Subtle sage green with natural feel",
    author: "GardenPath",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=garden",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(90deg, #c5e1a5 0px, #aed581 40px, #9ccc65 80px, #aed581 120px, #c5e1a5 160px);
        border: 4px solid #7cb342;
        border-radius: 28px;
        box-shadow: 0 12px 35px rgba(124, 179, 66, 0.4), inset 0 0 25px rgba(197, 225, 165, 0.5);
        filter: contrast(1.05) saturate(1.1);
      }
      .cr-payment-method-button {
        background: linear-gradient(to right, #9ccc65 0%, #7cb342 50%, #9ccc65 100%);
        color: white;
        border-radius: 20px;
        border: 3px ridge #33691e;
        box-shadow: 0 5px 15px rgba(124, 179, 66, 0.5);
        text-transform: lowercase;
      }
      .cr-app-title {
        color: #33691e;
        font-family: 'Verdana', sans-serif;
        line-height: 1.9;
      }
    `,
    users: 1098,
    tags: ["green", "sage", "nature", "calm"],
    createdAt: "2024-01-27T14:15:00Z",
    updatedAt: "2024-01-27T14:15:00Z",
  },
  {
    id: "21",
    slug: "crimson-night",
    name: "Crimson Night",
    description: "Deep crimson with midnight undertones",
    author: "NightShade",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(ellipse at top, #7a1a1a 0%, #4a0e0e 40%, #1a0000 80%, #000000 100%);
        border: 4px groove #dc143c;
        box-shadow: 0 0 80px rgba(220, 20, 60, 0.7), inset 0 0 60px rgba(122, 26, 26, 0.4), 0 25px 60px rgba(26, 0, 0, 0.8);
        border-radius: 12px;
        backdrop-filter: brightness(0.7);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(45deg, #dc143c 0px, #dc143c 15px, #9e0e28 15px, #9e0e28 30px);
        color: white;
        border: 3px solid #ffcccb;
        box-shadow: 0 0 35px rgba(220, 20, 60, 0.8), inset 0 2px 6px rgba(0, 0, 0, 0.5);
        clip-path: polygon(5% 0%, 100% 0%, 100% 75%, 95% 100%, 0% 100%, 0% 25%);
        text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
      }
      .cr-app-title {
        color: #ffcccb;
        text-shadow: 0 0 15px rgba(220, 20, 60, 0.6);
        font-weight: 500;
      }
    `,
    users: 1789,
    tags: ["red", "dark", "night", "crimson"],
    createdAt: "2024-01-21T11:45:00Z",
    updatedAt: "2024-01-21T11:45:00Z",
  },
  {
    id: "22",
    slug: "peach-cream",
    name: "Peach Cream",
    description: "Soft peach tones with creamy whites",
    author: "PastelArt",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 90deg at 40% 60%, #fff3e0 0deg, #ffe0b2 90deg, #ffcc80 180deg, #ffe0b2 270deg, #fff3e0 360deg);
        border: 5px solid #ff9800;
        border-radius: 45px;
        box-shadow: 0 20px 50px rgba(255, 152, 0, 0.3), inset 0 0 35px rgba(255, 243, 224, 0.6);
        transform: skew(-1deg, 1deg);
      }
      .cr-payment-method-button {
        background: linear-gradient(135deg, #ffcc80 0%, #ff9800 50%, #ffcc80 100%);
        color: white;
        border-radius: 25px;
        border: 3px double #e65100;
        box-shadow: 0 8px 24px rgba(255, 152, 0, 0.5);
        font-style: italic;
        font-weight: 600;
      }
      .cr-app-title {
        color: #e65100;
        line-height: 1.8;
        text-decoration: underline dashed #ff9800;
      }
    `,
    users: 1456,
    tags: ["peach", "soft", "warm", "light"],
    createdAt: "2024-01-24T09:30:00Z",
    updatedAt: "2024-01-24T09:30:00Z",
  },
  {
    id: "23",
    slug: "emerald-shine",
    name: "Emerald Shine",
    description: "Bright emerald green with glossy finish",
    author: "GemCraft",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gem",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(to top right, #00695c 0%, #00897b 30%, #26a69a 60%, #1de9b6 100%);
        border: 6px ridge #1de9b6;
        box-shadow: 0 0 100px rgba(29, 233, 182, 0.8), inset 0 0 50px rgba(0, 137, 123, 0.4), 0 20px 50px rgba(0, 105, 92, 0.5);
        border-radius: 15px;
        filter: brightness(1.15) saturate(1.3);
      }
      .cr-payment-method-button {
        background: radial-gradient(circle at 30% 30%, #1de9b6 0%, #26a69a 50%, #00897b 100%);
        color: #004d40;
        border: 4px solid #e0f2f1;
        box-shadow: 0 0 50px rgba(29, 233, 182, 0.9), inset 0 3px 10px rgba(255, 255, 255, 0.2);
        clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
        font-weight: 900;
        text-shadow: 0 1px 3px rgba(0, 77, 64, 0.5);
      }
      .cr-app-title {
        color: #e0f2f1;
        text-shadow: 0 0 20px rgba(29, 233, 182, 0.7);
        letter-spacing: 2px;
      }
    `,
    users: 2234,
    tags: ["green", "emerald", "bright", "glossy"],
    createdAt: "2024-01-16T12:20:00Z",
    updatedAt: "2024-01-16T12:20:00Z",
  },
  {
    id: "24",
    slug: "indigo-wave",
    name: "Indigo Wave",
    description: "Deep indigo with wave-like gradients",
    author: "WaveDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(120deg, #1a237e 0px, #303f9f 30px, #3949ab 60px, #303f9f 90px, #1a237e 120px);
        border: 5px solid #5c6bc0;
        box-shadow: 0 18px 45px rgba(92, 107, 192, 0.5), inset 0 0 30px rgba(26, 35, 126, 0.6);
        border-radius: 10px;
        transform: perspective(800px) rotateY(-2deg);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 180deg, #5c6bc0, #3949ab, #5c6bc0);
        color: white;
        border: 3px outset #e8eaf6;
        box-shadow: 0 10px 28px rgba(92, 107, 192, 0.6), inset 0 1px 4px rgba(232, 234, 246, 0.2);
        border-radius: 14px;
        text-transform: uppercase;
      }
      .cr-app-title {
        color: #e8eaf6;
        font-family: 'Arial', sans-serif;
        font-weight: 400;
      }
    `,
    users: 1654,
    tags: ["indigo", "blue", "wave", "dark"],
    createdAt: "2024-01-20T10:10:00Z",
    updatedAt: "2024-01-20T10:10:00Z",
  },
  {
    id: "25",
    slug: "honeycomb",
    name: "Honeycomb",
    description: "Sweet honey yellow with hexagonal patterns",
    author: "BeeHive",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(ellipse at center, #fff8e1 0%, #ffecb3 35%, #ffe082 70%, #ffc107 100%);
        border: 8px solid #ffa000;
        box-shadow: 0 15px 40px rgba(255, 160, 0, 0.5), inset 0 0 40px rgba(255, 248, 225, 0.7);
        border-radius: 5px;
        clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      }
      .cr-payment-method-button {
        background: repeating-conic-gradient(from 30deg, #ffa000 0deg, #ffe082 45deg, #ffa000 90deg);
        color: white;
        border: 4px groove #ff6f00;
        box-shadow: 0 8px 25px rgba(255, 160, 0, 0.7);
        clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
        font-weight: 700;
        text-shadow: 2px 2px 4px rgba(255, 111, 0, 0.8);
      }
      .cr-app-title {
        color: #ff6f00;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    `,
    users: 998,
    tags: ["yellow", "honey", "warm", "light"],
    createdAt: "2024-01-30T13:40:00Z",
    updatedAt: "2024-01-30T13:40:00Z",
  },
  {
    id: "26",
    slug: "steel-blue",
    name: "Steel Blue",
    description: "Industrial steel with cool blue tones",
    author: "SteelWorks",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=steel",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(90deg, #37474f 0%, #455a64 20%, #546e7a 40%, #607d8b 60%, #546e7a 80%, #455a64 100%);
        border: 4px ridge #78909c;
        box-shadow: 0 20px 50px rgba(55, 71, 79, 0.6), inset 0 5px 20px rgba(120, 144, 156, 0.2);
        border-radius: 8px;
        filter: contrast(1.1);
      }
      .cr-payment-method-button {
        background: linear-gradient(180deg, #78909c 0%, #607d8b 40%, #546e7a 100%);
        color: white;
        border: 3px inset #eceff1;
        box-shadow: 0 6px 20px rgba(96, 125, 139, 0.5), inset 0 2px 6px rgba(0, 0, 0, 0.3);
        border-radius: 6px;
        font-family: 'Roboto', sans-serif;
      }
      .cr-app-title {
        color: #eceff1;
        letter-spacing: 0.8px;
      }
    `,
    users: 1321,
    tags: ["blue", "steel", "industrial", "cool"],
    createdAt: "2024-01-23T11:25:00Z",
    updatedAt: "2024-01-23T11:25:00Z",
  },
  {
    id: "27",
    slug: "rose-gold",
    name: "Rose Gold",
    description: "Elegant rose gold with metallic accents",
    author: "RoseMetals",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(circle at 70% 30%, #fce4ec 0%, #f8bbd0 25%, #f48fb1 50%, #f8bbd0 75%, #fce4ec 100%);
        border: 6px solid transparent;
        border-image: linear-gradient(90deg, #e91e63, #f48fb1, #e91e63) 1;
        box-shadow: 0 0 70px rgba(233, 30, 99, 0.6), inset 0 0 50px rgba(252, 228, 236, 0.5), 0 20px 45px rgba(233, 30, 99, 0.3);
        border-radius: 30px;
        backdrop-filter: brightness(1.1);
      }
      .cr-payment-method-button {
        background: linear-gradient(to right, #e91e63 0%, #f48fb1 25%, #e91e63 50%, #f48fb1 75%, #e91e63 100%);
        background-size: 200% auto;
        color: white;
        border: 4px double #880e4f;
        box-shadow: 0 12px 35px rgba(233, 30, 99, 0.7), inset 0 2px 8px rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        font-weight: 800;
        text-shadow: 1px 1px 4px rgba(136, 14, 79, 0.7);
      }
      .cr-app-title {
        color: #880e4f;
        text-shadow: 0 1px 3px rgba(233, 30, 99, 0.3);
        font-style: oblique;
      }
    `,
    users: 3456,
    tags: ["pink", "gold", "elegant", "metallic"],
    createdAt: "2024-01-09T14:55:00Z",
    updatedAt: "2024-01-09T14:55:00Z",
  },
  {
    id: "28",
    slug: "jade-temple",
    name: "Jade Temple",
    description: "Ancient jade green with oriental vibes",
    author: "TempleDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-radial-gradient(circle at 50% 50%, #1b5e20 0px, #2e7d32 25px, #43a047 50px, #2e7d32 75px, #1b5e20 100px);
        border: 7px double #66bb6a;
        box-shadow: 0 15px 40px rgba(27, 94, 32, 0.7), inset 0 0 40px rgba(67, 160, 71, 0.3);
        border-radius: 12px;
        filter: saturate(1.2);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 120deg, #66bb6a, #43a047, #2e7d32, #43a047, #66bb6a);
        color: white;
        border: 4px ridge #e8f5e9;
        box-shadow: 0 8px 24px rgba(102, 187, 106, 0.6), inset 0 2px 6px rgba(232, 245, 233, 0.2);
        clip-path: polygon(10% 25%, 50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%);
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }
      .cr-app-title {
        color: #e8f5e9;
        font-family: 'Georgia', serif;
        line-height: 1.7;
      }
    `,
    users: 876,
    tags: ["green", "jade", "oriental", "temple"],
    createdAt: "2024-01-31T10:00:00Z",
    updatedAt: "2024-01-31T10:00:00Z",
  },
  {
    id: "29",
    slug: "plum-purple",
    name: "Plum Purple",
    description: "Rich plum purple with deep tones",
    author: "PurpleRain",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=plum",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(to bottom left, #4a148c 0%, #6a1b9a 25%, #8e24aa 50%, #6a1b9a 75%, #4a148c 100%);
        border: 5px groove #ab47bc;
        box-shadow: 0 22px 55px rgba(74, 20, 140, 0.6), inset 0 0 45px rgba(142, 36, 170, 0.4);
        border-radius: 18px;
        backdrop-filter: saturate(150%);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(90deg, #ab47bc 0px, #ab47bc 20px, #8e24aa 20px, #8e24aa 40px);
        color: white;
        border: 4px solid #f3e5f5;
        box-shadow: 0 10px 30px rgba(171, 71, 188, 0.7), inset 0 3px 8px rgba(0, 0, 0, 0.3);
        border-radius: 22px;
        font-weight: 700;
        text-shadow: 2px 2px 5px rgba(74, 20, 140, 0.8);
      }
      .cr-app-title {
        color: #f3e5f5;
        letter-spacing: 1.2px;
        text-decoration: underline dotted #ab47bc;
      }
    `,
    users: 1567,
    tags: ["purple", "plum", "rich", "dark"],
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-18T09:15:00Z",
  },
  {
    id: "30",
    slug: "charcoal-dark",
    name: "Charcoal Dark",
    description: "Deep charcoal with matte finish",
    author: "DarkMatter",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(135deg, #121212 0px, #1e1e1e 15px, #2a2a2a 30px, #1e1e1e 45px, #121212 60px);
        border: 3px solid #424242;
        box-shadow: 0 25px 60px rgba(18, 18, 18, 0.9), inset 0 0 30px rgba(66, 66, 66, 0.2);
        border-radius: 4px;
        filter: contrast(1.15);
      }
      .cr-payment-method-button {
        background: linear-gradient(135deg, #424242 0%, #2a2a2a 50%, #424242 100%);
        color: white;
        border: 2px solid #757575;
        box-shadow: 0 6px 18px rgba(66, 66, 66, 0.7), inset 0 1px 4px rgba(117, 117, 117, 0.2);
        border-radius: 5px;
        font-family: 'Courier New', monospace;
        text-transform: capitalize;
      }
      .cr-app-title {
        color: #e0e0e0;
        opacity: 0.92;
        letter-spacing: 0.5px;
      }
    `,
    users: 2890,
    tags: ["dark", "charcoal", "minimal", "matte"],
    createdAt: "2024-01-07T15:30:00Z",
    updatedAt: "2024-01-07T15:30:00Z",
  },
  {
    id: "31",
    slug: "coral-reef",
    name: "Coral Reef",
    description: "Vibrant coral with underwater aesthetics",
    author: "ReefLife",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 45deg at 60% 40%, #ff6f61 0deg, #ff8a80 72deg, #ffab91 144deg, #ff8a80 216deg, #ff6f61 288deg, #ff6f61 360deg);
        border: 7px wavy #ff5722;
        border-radius: 50px;
        box-shadow: 0 18px 50px rgba(255, 87, 34, 0.6), inset 0 0 45px rgba(255, 171, 145, 0.4);
        transform: rotate(-1deg) scale(1.02);
      }
      .cr-payment-method-button {
        background: radial-gradient(circle at top left, #ff5722 0%, #ff6f61 50%, #ff8a80 100%);
        color: white;
        border-radius: 35px;
        border: 4px double #bf360c;
        box-shadow: 0 10px 30px rgba(255, 87, 34, 0.7), inset 0 2px 8px rgba(255, 255, 255, 0.2);
        font-weight: 700;
        text-shadow: 2px 2px 6px rgba(191, 54, 12, 0.8);
      }
      .cr-app-title {
        color: #bf360c;
        text-decoration: overline wavy #ff5722;
        line-height: 1.9;
      }
    `,
    users: 1743,
    tags: ["coral", "orange", "vibrant", "ocean"],
    createdAt: "2024-01-25T12:45:00Z",
    updatedAt: "2024-01-25T12:45:00Z",
  },
  {
    id: "32",
    slug: "sky-blue",
    name: "Sky Blue",
    description: "Clear sky blue with airy feel",
    author: "SkyHigh",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sky",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(180deg, #e3f2fd 0px, #bbdefb 40px, #90caf9 80px, #bbdefb 120px, #e3f2fd 160px);
        border: 4px solid #42a5f5;
        border-radius: 28px;
        box-shadow: 0 20px 55px rgba(66, 165, 245, 0.4), inset 0 0 40px rgba(227, 242, 253, 0.6);
        backdrop-filter: blur(12px) brightness(1.05);
      }
      .cr-payment-method-button {
        background: linear-gradient(to bottom, #90caf9 0%, #42a5f5 50%, #1e88e5 100%);
        color: white;
        border-radius: 18px;
        border: 3px solid #0d47a1;
        box-shadow: 0 8px 26px rgba(66, 165, 245, 0.6), inset 0 2px 6px rgba(255, 255, 255, 0.3);
        font-weight: 600;
      }
      .cr-app-title {
        color: #0d47a1;
        font-style: italic;
        letter-spacing: 0.8px;
      }
    `,
    users: 2567,
    tags: ["blue", "sky", "light", "airy"],
    createdAt: "2024-01-12T08:20:00Z",
    updatedAt: "2024-01-12T08:20:00Z",
  },
  {
    id: "33",
    slug: "burgundy-wine",
    name: "Burgundy Wine",
    description: "Sophisticated burgundy with wine-inspired depth",
    author: "VintageVines",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(ellipse at bottom left, #4a0404 0%, #6d0c0c 35%, #900c3f 70%, #6d0c0c 100%);
        border: 6px groove #c70039;
        box-shadow: 0 25px 60px rgba(144, 12, 63, 0.7), inset 0 0 50px rgba(74, 4, 4, 0.6);
        border-radius: 10px;
        filter: brightness(0.95) saturate(1.3);
      }
      .cr-payment-method-button {
        background: repeating-conic-gradient(from 90deg, #c70039 0deg, #900c3f 60deg, #c70039 120deg);
        color: white;
        border: 4px outset #ffc0cb;
        box-shadow: 0 0 40px rgba(199, 0, 57, 0.8), inset 0 2px 8px rgba(0, 0, 0, 0.5);
        clip-path: polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%);
        font-weight: 800;
        text-transform: uppercase;
      }
      .cr-app-title {
        color: #ffc0cb;
        text-shadow: 0 0 12px rgba(199, 0, 57, 0.6);
      }
    `,
    users: 1234,
    tags: ["red", "burgundy", "wine", "sophisticated"],
    createdAt: "2024-01-28T14:00:00Z",
    updatedAt: "2024-01-28T14:00:00Z",
  },
  {
    id: "34",
    slug: "lime-zest",
    name: "Lime Zest",
    description: "Zesty lime green with fresh energy",
    author: "CitrusFresh",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(45deg, #f4ff81 0%, #dce775 20%, #cddc39 40%, #dce775 60%, #f4ff81 80%, #dce775 100%);
        background-size: 200% 200%;
        border: 8px dotted #afb42b;
        box-shadow: 0 0 70px rgba(205, 220, 57, 0.7), inset 0 0 40px rgba(244, 255, 129, 0.5);
        border-radius: 20px;
        animation: shift 4s ease-in-out infinite;
      }
      .cr-payment-method-button {
        background: conic-gradient(from 0deg, #cddc39, #dce775, #f4ff81, #dce775, #cddc39);
        color: #33691e;
        border-radius: 50px;
        border: 5px ridge #33691e;
        box-shadow: 0 0 50px rgba(205, 220, 57, 0.9), inset 0 3px 10px rgba(244, 255, 129, 0.4);
        font-weight: 900;
        text-shadow: 1px 1px 3px rgba(175, 180, 43, 0.7);
      }
      .cr-app-title {
        color: #33691e;
        text-transform: lowercase;
        letter-spacing: 2px;
      }
    `,
    users: 1098,
    tags: ["green", "lime", "fresh", "zesty"],
    createdAt: "2024-01-29T11:30:00Z",
    updatedAt: "2024-01-29T11:30:00Z",
  },
  {
    id: "35",
    slug: "amber-glow",
    name: "Amber Glow",
    description: "Warm amber with glowing effect",
    author: "GlowDesigns",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=glow",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(circle at 40% 60%, #ff6f00 0%, #ff8f00 30%, #ffa726 60%, #ff8f00 90%, #ff6f00 100%);
        border: 6px ridge #fb8c00;
        box-shadow: 0 0 120px rgba(255, 143, 0, 0.9), inset 0 0 60px rgba(255, 167, 38, 0.4), 0 25px 55px rgba(255, 111, 0, 0.5);
        border-radius: 22px;
        filter: brightness(1.15) contrast(1.1);
        animation: glow 3s ease-in-out infinite alternate;
      }
      .cr-payment-method-button {
        background: linear-gradient(to right, #fb8c00 0%, #ffa726 25%, #ff8f00 50%, #ffa726 75%, #fb8c00 100%);
        background-size: 300% auto;
        color: white;
        border-radius: 15px;
        border: 4px double #e65100;
        box-shadow: 0 0 60px rgba(251, 140, 0, 0.9), inset 0 2px 10px rgba(255, 255, 255, 0.2);
        font-weight: 900;
        text-shadow: 0 0 10px rgba(230, 81, 0, 1);
      }
      .cr-app-title {
        color: #e65100;
        text-shadow: 0 0 15px rgba(251, 140, 0, 0.8);
        font-weight: 700;
      }
    `,
    users: 1890,
    tags: ["orange", "amber", "warm", "glow"],
    createdAt: "2024-01-17T10:40:00Z",
    updatedAt: "2024-01-17T10:40:00Z",
  },
  {
    id: "36",
    slug: "teal-modern",
    name: "Teal Modern",
    description: "Contemporary teal with modern aesthetics",
    author: "TealTech",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(60deg, #00695c 0px, #00796b 35px, #00897b 70px, #00796b 105px, #00695c 140px);
        border: 5px solid #009688;
        box-shadow: 0 22px 58px rgba(0, 150, 136, 0.5), inset 0 0 35px rgba(0, 137, 123, 0.4);
        border-radius: 16px;
        backdrop-filter: saturate(120%);
      }
      .cr-payment-method-button {
        background: linear-gradient(135deg, #009688 0%, #00897b 50%, #009688 100%);
        color: white;
        border-radius: 12px;
        border: 3px solid #e0f2f1;
        box-shadow: 0 10px 32px rgba(0, 150, 136, 0.6), inset 0 2px 6px rgba(224, 242, 241, 0.2);
        font-family: 'Helvetica', sans-serif;
        text-transform: uppercase;
      }
      .cr-app-title {
        color: #e0f2f1;
        letter-spacing: 1px;
        line-height: 1.8;
      }
    `,
    users: 2123,
    tags: ["teal", "modern", "cool", "contemporary"],
    createdAt: "2024-01-14T09:50:00Z",
    updatedAt: "2024-01-14T09:50:00Z",
  },
  {
    id: "37",
    slug: "blush-pink",
    name: "Blush Pink",
    description: "Delicate blush pink with soft gradients",
    author: "BlushBeauty",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 135deg at 45% 55%, #fff0f3 0deg, #ffcdd2 90deg, #ef9a9a 180deg, #ffcdd2 270deg, #fff0f3 360deg);
        border: 6px solid #e57373;
        border-radius: 55px;
        box-shadow: 0 18px 48px rgba(229, 115, 115, 0.4), inset 0 0 45px rgba(255, 240, 243, 0.6);
        transform: skew(-0.5deg, 0.5deg);
      }
      .cr-payment-method-button {
        background: radial-gradient(ellipse at center, #e57373 0%, #ef9a9a 50%, #ffcdd2 100%);
        color: white;
        border-radius: 50px 10px 50px 10px;
        border: 4px groove #b71c1c;
        box-shadow: 0 12px 35px rgba(229, 115, 115, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.3);
        font-weight: 600;
        text-shadow: 2px 2px 5px rgba(183, 28, 28, 0.6);
      }
      .cr-app-title {
        color: #b71c1c;
        font-style: oblique;
        text-decoration: underline wavy #e57373;
      }
    `,
    users: 2456,
    tags: ["pink", "blush", "soft", "delicate"],
    createdAt: "2024-01-11T13:15:00Z",
    updatedAt: "2024-01-11T13:15:00Z",
  },
  {
    id: "38",
    slug: "graphite-pro",
    name: "Graphite Pro",
    description: "Professional graphite with clean lines",
    author: "ProDesigns",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pro",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(to top right, #424242 0%, #616161 30%, #757575 60%, #616161 90%, #424242 100%);
        border: 4px ridge #9e9e9e;
        box-shadow: 0 28px 65px rgba(66, 66, 66, 0.8), inset 0 5px 22px rgba(158, 158, 158, 0.2);
        border-radius: 6px;
        filter: contrast(1.2) brightness(0.95);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(180deg, #616161 0px, #757575 10px, #616161 20px);
        color: white;
        border: 3px inset #fafafa;
        box-shadow: 0 8px 24px rgba(97, 97, 97, 0.6), inset 0 2px 6px rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        font-family: 'Roboto Mono', monospace;
        text-transform: uppercase;
        letter-spacing: 1.5px;
      }
      .cr-app-title {
        color: #fafafa;
        opacity: 0.96;
      }
    `,
    users: 3678,
    tags: ["gray", "professional", "clean", "modern"],
    createdAt: "2024-01-05T14:25:00Z",
    updatedAt: "2024-01-05T14:25:00Z",
  },
  {
    id: "39",
    slug: "copper-shine",
    name: "Copper Shine",
    description: "Metallic copper with reflective finish",
    author: "MetalShine",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(120deg, #bf360c 0%, #d84315 25%, #e64a19 50%, #d84315 75%, #bf360c 100%);
        border: 6px solid transparent;
        border-image: linear-gradient(45deg, #ff5722, #bf360c, #ff5722) 1;
        box-shadow: 0 0 90px rgba(191, 54, 12, 0.8), inset 0 0 55px rgba(230, 74, 25, 0.3), 0 22px 55px rgba(191, 54, 12, 0.5);
        border-radius: 18px;
        filter: brightness(1.1) saturate(1.2);
      }
      .cr-payment-method-button {
        background: linear-gradient(to right, #bf360c 0%, #ff5722 25%, #d84315 50%, #ff5722 75%, #bf360c 100%);
        background-size: 200% auto;
        color: white;
        border-radius: 20px;
        border: 4px double #fbe9e7;
        box-shadow: 0 0 50px rgba(255, 87, 34, 0.8), inset 0 3px 10px rgba(255, 255, 255, 0.2);
        font-weight: 900;
        text-shadow: 0 0 8px rgba(191, 54, 12, 1);
      }
      .cr-app-title {
        color: #fbe9e7;
        text-shadow: 0 0 18px rgba(255, 87, 34, 0.7);
        font-weight: 700;
      }
    `,
    users: 1567,
    tags: ["copper", "metallic", "orange", "shine"],
    createdAt: "2024-01-22T10:35:00Z",
    updatedAt: "2024-01-22T10:35:00Z",
  },
  {
    id: "40",
    slug: "aqua-splash",
    name: "Aqua Splash",
    description: "Refreshing aqua with splash effect",
    author: "WaterWorks",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(ellipse at top right, #00bcd4 0%, #00e5ff 40%, #84ffff 80%, #00e5ff 100%);
        border: 8px wavy #00acc1;
        border-radius: 45px;
        box-shadow: 0 20px 55px rgba(0, 188, 212, 0.7), inset 0 0 50px rgba(132, 255, 255, 0.4);
        backdrop-filter: blur(10px) brightness(1.1);
        transform: perspective(600px) rotateX(-1deg);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 90deg, #00bcd4, #00e5ff, #84ffff, #00e5ff, #00bcd4);
        color: white;
        border-radius: 30px;
        border: 4px ridge #006064;
        box-shadow: 0 12px 38px rgba(0, 188, 212, 0.7), inset 0 3px 10px rgba(132, 255, 255, 0.3);
        font-weight: 800;
        text-shadow: 2px 2px 6px rgba(0, 96, 100, 0.8);
      }
      .cr-app-title {
        color: #006064;
        text-decoration: overline double #00bcd4;
        line-height: 1.8;
      }
    `,
    users: 1987,
    tags: ["aqua", "blue", "fresh", "splash"],
    createdAt: "2024-01-19T09:10:00Z",
    updatedAt: "2024-01-19T09:10:00Z",
  },
  {
    id: "41",
    slug: "magenta-pop",
    name: "Magenta Pop",
    description: "Bold magenta with pop art vibes",
    author: "PopArtist",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pop",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-radial-gradient(circle at 40% 50%, #ad1457 0px, #c2185b 30px, #d81b60 60px, #c2185b 90px, #ad1457 120px);
        border: 8px dotted #e91e63;
        box-shadow: 0 0 100px rgba(233, 30, 99, 0.9), inset 0 0 55px rgba(216, 27, 96, 0.4), 0 25px 60px rgba(173, 20, 87, 0.6);
        border-radius: 25px;
        filter: saturate(1.4) brightness(1.05);
      }
      .cr-payment-method-button {
        background: linear-gradient(45deg, #e91e63 0%, #d81b60 25%, #c2185b 50%, #d81b60 75%, #e91e63 100%);
        background-size: 300% auto;
        color: white;
        border-radius: 12px;
        border: 5px outset #fce4ec;
        box-shadow: 0 0 60px rgba(233, 30, 99, 0.9), inset 0 3px 10px rgba(252, 228, 236, 0.2);
        font-weight: 900;
        text-transform: uppercase;
        text-shadow: 0 0 12px rgba(173, 20, 87, 1);
      }
      .cr-app-title {
        color: #fce4ec;
        text-shadow: 0 0 20px rgba(233, 30, 99, 0.8);
        letter-spacing: 2px;
      }
    `,
    users: 2345,
    tags: ["magenta", "pink", "bold", "pop"],
    createdAt: "2024-01-16T11:20:00Z",
    updatedAt: "2024-01-16T11:20:00Z",
  },
  {
    id: "42",
    slug: "olive-earth",
    name: "Olive Earth",
    description: "Natural olive tones with earthy feel",
    author: "EarthTones",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(120deg, #827717 0px, #9e9d24 28px, #afb42b 56px, #9e9d24 84px, #827717 112px);
        border: 6px ridge #c0ca33;
        box-shadow: 0 18px 45px rgba(130, 119, 23, 0.6), inset 0 0 38px rgba(175, 180, 43, 0.3);
        border-radius: 14px;
        filter: sepia(15%) contrast(1.1);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 60deg, #9e9d24, #afb42b, #c0ca33, #afb42b, #9e9d24);
        color: white;
        border-radius: 16px;
        border: 4px groove #f9fbe7;
        box-shadow: 0 10px 30px rgba(158, 157, 36, 0.6), inset 0 2px 8px rgba(249, 251, 231, 0.2);
        font-weight: 700;
        text-transform: capitalize;
      }
      .cr-app-title {
        color: #f9fbe7;
        font-family: 'Times New Roman', serif;
        line-height: 1.7;
      }
    `,
    users: 876,
    tags: ["green", "olive", "earth", "natural"],
    createdAt: "2024-01-30T08:45:00Z",
    updatedAt: "2024-01-30T08:45:00Z",
  },
  {
    id: "43",
    slug: "royal-blue",
    name: "Royal Blue",
    description: "Regal royal blue with majestic feel",
    author: "RoyalDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: linear-gradient(to bottom, #0d47a1 0%, #1565c0 20%, #1976d2 40%, #1e88e5 60%, #1976d2 80%, #1565c0 100%);
        border: 7px double #1e88e5;
        box-shadow: 0 25px 65px rgba(13, 71, 161, 0.7), inset 0 0 45px rgba(30, 136, 229, 0.3);
        border-radius: 20px;
        backdrop-filter: brightness(0.9);
      }
      .cr-payment-method-button {
        background: radial-gradient(ellipse at top, #1e88e5 0%, #1976d2 50%, #1565c0 100%);
        color: white;
        border-radius: 10px;
        border: 4px ridge #e3f2fd;
        box-shadow: 0 12px 38px rgba(25, 118, 210, 0.7), inset 0 3px 10px rgba(227, 242, 253, 0.2);
        font-weight: 800;
        text-transform: uppercase;
        text-shadow: 2px 2px 6px rgba(13, 71, 161, 0.8);
      }
      .cr-app-title {
        color: #e3f2fd;
        letter-spacing: 1.5px;
        font-family: 'Georgia', serif;
      }
    `,
    users: 3234,
    tags: ["blue", "royal", "regal", "majestic"],
    createdAt: "2024-01-08T12:00:00Z",
    updatedAt: "2024-01-08T12:00:00Z",
  },
  {
    id: "44",
    slug: "tangerine-bright",
    name: "Tangerine Bright",
    description: "Bright tangerine with citrus energy",
    author: "CitrusPop",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=citrus",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 180deg at 55% 45%, #ff6f00 0deg, #ff8f00 90deg, #ffa726 180deg, #ff8f00 270deg, #ff6f00 360deg);
        border: 8px solid #fb8c00;
        box-shadow: 0 20px 58px rgba(251, 140, 0, 0.7), inset 0 0 48px rgba(255, 167, 38, 0.4);
        border-radius: 35px;
        transform: rotate(1deg);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(45deg, #ff9800 0px, #ffa726 18px, #ff9800 36px);
        color: white;
        border-radius: 25px;
        border: 5px double #e65100;
        box-shadow: 0 10px 35px rgba(255, 152, 0, 0.8), inset 0 2px 8px rgba(255, 255, 255, 0.3);
        font-weight: 800;
        text-shadow: 2px 2px 5px rgba(230, 81, 0, 0.8);
      }
      .cr-app-title {
        color: #e65100;
        text-decoration: overline wavy #ff9800;
        line-height: 1.9;
      }
    `,
    users: 1456,
    tags: ["orange", "tangerine", "bright", "citrus"],
    createdAt: "2024-01-24T10:30:00Z",
    updatedAt: "2024-01-24T10:30:00Z",
  },
  {
    id: "45",
    slug: "silver-lining",
    name: "Silver Lining",
    description: "Elegant silver with soft shimmer",
    author: "SilverEdge",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(90deg, #bdbdbd 0px, #e0e0e0 25px, #f5f5f5 50px, #e0e0e0 75px, #bdbdbd 100px);
        border: 5px groove #9e9e9e;
        box-shadow: 0 22px 55px rgba(158, 158, 158, 0.5), inset 0 0 40px rgba(245, 245, 245, 0.6);
        border-radius: 18px;
        filter: brightness(1.05);
      }
      .cr-payment-method-button {
        background: linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 50%, #e0e0e0 100%);
        color: white;
        border-radius: 15px;
        border: 3px solid #424242;
        box-shadow: 0 8px 28px rgba(158, 158, 158, 0.6), inset 0 2px 8px rgba(224, 224, 224, 0.3);
        font-weight: 600;
      }
      .cr-app-title {
        color: #424242;
        letter-spacing: 1px;
        opacity: 0.95;
      }
    `,
    users: 1678,
    tags: ["silver", "elegant", "light", "minimal"],
    createdAt: "2024-01-26T13:45:00Z",
    updatedAt: "2024-01-26T13:45:00Z",
  },
  {
    id: "46",
    slug: "raspberry-red",
    name: "Raspberry Red",
    description: "Sweet raspberry red with fruity vibes",
    author: "BerryDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(circle at 60% 40%, #c62828 0%, #d32f2f 35%, #e53935 70%, #d32f2f 100%);
        border: 6px solid #ef5350;
        border-radius: 32px;
        box-shadow: 0 20px 52px rgba(211, 47, 47, 0.6), inset 0 0 42px rgba(229, 57, 53, 0.4);
        transform: skew(0.5deg, -0.5deg);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 120deg, #ef5350, #e53935, #d32f2f, #e53935, #ef5350);
        color: white;
        border-radius: 20px;
        border: 4px ridge #ffebee;
        box-shadow: 0 10px 32px rgba(239, 83, 80, 0.7), inset 0 2px 8px rgba(255, 235, 238, 0.2);
        font-weight: 700;
        text-shadow: 2px 2px 5px rgba(198, 40, 40, 0.8);
      }
      .cr-app-title {
        color: #ffebee;
        font-style: italic;
        text-decoration: underline dotted #ef5350;
      }
    `,
    users: 1234,
    tags: ["red", "raspberry", "fruity", "sweet"],
    createdAt: "2024-01-27T11:55:00Z",
    updatedAt: "2024-01-27T11:55:00Z",
  },
  {
    id: "47",
    slug: "ice-blue",
    name: "Ice Blue",
    description: "Frosty ice blue with cool aesthetics",
    author: "FrostDesigns",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=frost",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-radial-gradient(circle at 30% 70%, #e1f5fe 0px, #b3e5fc 32px, #81d4fa 64px, #b3e5fc 96px, #e1f5fe 128px);
        border: 6px solid #4fc3f7;
        border-radius: 28px;
        box-shadow: 0 18px 50px rgba(79, 195, 247, 0.5), inset 0 0 45px rgba(225, 245, 254, 0.6);
        backdrop-filter: blur(15px) brightness(1.15);
      }
      .cr-payment-method-button {
        background: linear-gradient(to right, #29b6f6 0%, #4fc3f7 50%, #81d4fa 100%);
        color: white;
        border-radius: 22px;
        border: 4px groove #01579b;
        box-shadow: 0 10px 35px rgba(41, 182, 246, 0.7), inset 0 3px 10px rgba(255, 255, 255, 0.3);
        font-weight: 700;
        text-shadow: 1px 1px 4px rgba(1, 87, 155, 0.8);
      }
      .cr-app-title {
        color: #01579b;
        letter-spacing: 1.2px;
        line-height: 1.8;
      }
    `,
    users: 1789,
    tags: ["blue", "ice", "cool", "frost"],
    createdAt: "2024-01-21T09:25:00Z",
    updatedAt: "2024-01-21T09:25:00Z",
  },
  {
    id: "48",
    slug: "terracotta-warm",
    name: "Terracotta Warm",
    description: "Warm terracotta with Mediterranean feel",
    author: "MediterraneanStyle",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 225deg at 50% 50%, #bf360c 0deg, #d84315 72deg, #ff5722 144deg, #d84315 216deg, #bf360c 288deg, #bf360c 360deg);
        border: 7px ridge #ff6e40;
        box-shadow: 0 20px 55px rgba(191, 54, 12, 0.6), inset 0 0 45px rgba(255, 87, 34, 0.3);
        border-radius: 16px;
        filter: sepia(8%) saturate(1.2);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(90deg, #ff5722 0px, #ff6e40 22px, #ff5722 44px);
        color: white;
        border-radius: 18px;
        border: 4px outset #fbe9e7;
        box-shadow: 0 10px 32px rgba(255, 87, 34, 0.7), inset 0 2px 8px rgba(251, 233, 231, 0.2);
        font-weight: 800;
        text-transform: lowercase;
      }
      .cr-app-title {
        color: #fbe9e7;
        font-family: 'Verdana', sans-serif;
        line-height: 1.7;
      }
    `,
    users: 998,
    tags: ["orange", "terracotta", "warm", "mediterranean"],
    createdAt: "2024-01-29T14:20:00Z",
    updatedAt: "2024-01-29T14:20:00Z",
  },
  {
    id: "49",
    slug: "violet-storm",
    name: "Violet Storm",
    description: "Intense violet with stormy energy",
    author: "StormChaser",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(ellipse at top, #7b1fa2 0%, #6a1b9a 40%, #4a148c 80%, #1a0033 100%);
        border: 8px groove #9c27b0;
        box-shadow: 0 0 110px rgba(156, 39, 176, 0.9), inset 0 0 60px rgba(123, 31, 162, 0.5), 0 28px 65px rgba(74, 20, 140, 0.7);
        border-radius: 22px;
        filter: brightness(1.05) saturate(1.3);
        animation: storm 4s ease-in-out infinite alternate;
      }
      .cr-payment-method-button {
        background: linear-gradient(45deg, #9c27b0 0%, #7b1fa2 25%, #6a1b9a 50%, #7b1fa2 75%, #9c27b0 100%);
        background-size: 300% auto;
        color: white;
        border-radius: 15px;
        border: 5px outset #f3e5f5;
        box-shadow: 0 0 60px rgba(156, 39, 176, 0.9), inset 0 3px 10px rgba(243, 229, 245, 0.2);
        font-weight: 900;
        text-shadow: 0 0 15px rgba(74, 20, 140, 1);
      }
      .cr-app-title {
        color: #f3e5f5;
        text-shadow: 0 0 25px rgba(156, 39, 176, 0.8);
        letter-spacing: 2px;
      }
    `,
    users: 1654,
    tags: ["purple", "violet", "intense", "dark"],
    createdAt: "2024-01-20T12:40:00Z",
    updatedAt: "2024-01-20T12:40:00Z",
  },
  {
    id: "50",
    slug: "khaki-safari",
    name: "Khaki Safari",
    description: "Adventure-ready khaki with safari vibes",
    author: "SafariAdventure",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=safari",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(45deg, #827717 0px, #9e9d24 30px, #afb42b 60px, #9e9d24 90px, #827717 120px);
        border: 6px ridge #c0ca33;
        box-shadow: 0 18px 48px rgba(130, 119, 23, 0.6), inset 0 0 40px rgba(175, 180, 43, 0.3);
        border-radius: 12px;
        filter: sepia(12%) contrast(1.08);
      }
      .cr-payment-method-button {
        background: radial-gradient(circle at center, #afb42b 0%, #9e9d24 50%, #827717 100%);
        color: white;
        border-radius: 14px;
        border: 4px groove #33691e;
        box-shadow: 0 10px 32px rgba(175, 180, 43, 0.6), inset 0 2px 8px rgba(51, 105, 30, 0.2);
        font-weight: 700;
        text-transform: uppercase;
      }
      .cr-app-title {
        color: #33691e;
        font-family: 'Arial', sans-serif;
        letter-spacing: 0.8px;
      }
    `,
    users: 876,
    tags: ["khaki", "safari", "adventure", "nature"],
    createdAt: "2024-01-31T11:15:00Z",
    updatedAt: "2024-01-31T11:15:00Z",
  },
  {
    id: "51",
    slug: "ruby-red",
    name: "Ruby Red",
    description: "Precious ruby red with gem-like quality",
    author: "GemStone",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(circle at 25% 75%, #b71c1c 0%, #c62828 30%, #d32f2f 60%, #c62828 90%, #b71c1c 100%);
        border: 8px solid transparent;
        border-image: linear-gradient(135deg, #e53935, #f44336, #e53935) 1;
        box-shadow: 0 0 100px rgba(183, 28, 28, 0.8), inset 0 0 60px rgba(211, 47, 47, 0.4), 0 25px 60px rgba(183, 28, 28, 0.6);
        border-radius: 20px;
        filter: brightness(1.1) saturate(1.4);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 90deg, #f44336, #e53935, #d32f2f, #e53935, #f44336);
        color: white;
        border-radius: 16px;
        border: 5px ridge #ffebee;
        box-shadow: 0 0 70px rgba(244, 67, 54, 0.9), inset 0 3px 10px rgba(255, 235, 238, 0.2);
        font-weight: 900;
        text-shadow: 0 0 15px rgba(183, 28, 28, 1);
        clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%);
      }
      .cr-app-title {
        color: #ffebee;
        text-shadow: 0 0 20px rgba(244, 67, 54, 0.7);
        letter-spacing: 1.5px;
      }
    `,
    users: 2123,
    tags: ["red", "ruby", "gem", "precious"],
    createdAt: "2024-01-15T10:50:00Z",
    updatedAt: "2024-01-15T10:50:00Z",
  },
  {
    id: "52",
    slug: "seafoam-green",
    name: "Seafoam Green",
    description: "Gentle seafoam with coastal aesthetics",
    author: "CoastalVibes",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-radial-gradient(ellipse at 50% 50%, #e0f2f1 0px, #b2dfdb 35px, #80cbc4 70px, #b2dfdb 105px, #e0f2f1 140px);
        border: 6px dotted #4db6ac;
        border-radius: 45px;
        box-shadow: 0 22px 58px rgba(77, 182, 172, 0.5), inset 0 0 48px rgba(224, 242, 241, 0.6);
        backdrop-filter: blur(10px) saturate(130%);
      }
      .cr-payment-method-button {
        background: linear-gradient(to bottom right, #26a69a 0%, #4db6ac 50%, #80cbc4 100%);
        color: white;
        border-radius: 35px;
        border: 4px ridge #004d40;
        box-shadow: 0 12px 38px rgba(38, 166, 154, 0.7), inset 0 2px 8px rgba(255, 255, 255, 0.3);
        font-weight: 700;
        text-shadow: 2px 2px 5px rgba(0, 77, 64, 0.8);
      }
      .cr-app-title {
        color: #004d40;
        text-decoration: underline wavy #4db6ac;
        line-height: 1.8;
      }
    `,
    users: 1456,
    tags: ["green", "seafoam", "coastal", "gentle"],
    createdAt: "2024-01-23T13:30:00Z",
    updatedAt: "2024-01-23T13:30:00Z",
  },
  {
    id: "53",
    slug: "midnight-black",
    name: "Midnight Black",
    description: "Pure midnight black with deep contrast",
    author: "DarkKnight",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=knight",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(90deg, #000000 0px, #0d0d0d 10px, #1a1a1a 20px, #0d0d0d 30px, #000000 40px);
        border: 4px solid #333333;
        box-shadow: 0 30px 70px rgba(0, 0, 0, 0.95), inset 0 0 30px rgba(51, 51, 51, 0.4), 0 0 0 1px rgba(85, 85, 85, 0.3);
        border-radius: 8px;
        backdrop-filter: brightness(0.6);
      }
      .cr-payment-method-button {
        background: linear-gradient(135deg, #1a1a1a 0%, #333333 50%, #1a1a1a 100%);
        color: white;
        border-radius: 6px;
        border: 3px inset #555;
        box-shadow: 0 8px 28px rgba(26, 26, 26, 0.9), inset 0 2px 6px rgba(85, 85, 85, 0.4);
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
        letter-spacing: 2px;
      }
      .cr-app-title {
        color: #ffffff;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
        opacity: 0.98;
      }
    `,
    users: 4567,
    tags: ["black", "dark", "midnight", "contrast"],
    createdAt: "2024-01-04T16:00:00Z",
    updatedAt: "2024-01-04T16:00:00Z",
  },
  {
    id: "54",
    slug: "lemon-yellow",
    name: "Lemon Yellow",
    description: "Zesty lemon yellow with citrus punch",
    author: "LemonDrop",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 270deg at 45% 55%, #fffde7 0deg, #fff9c4 72deg, #fff59d 144deg, #fff9c4 216deg, #fffde7 288deg, #fffde7 360deg);
        border: 8px solid #ffee58;
        box-shadow: 0 18px 52px rgba(255, 238, 88, 0.6), inset 0 0 45px rgba(255, 253, 231, 0.7);
        border-radius: 40px;
        transform: skew(0.5deg, -0.5deg);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(135deg, #ffeb3b 0px, #fff59d 20px, #ffeb3b 40px);
        color: #1a1a00;
        border-radius: 30px;
        border: 5px groove #f57f17;
        box-shadow: 0 12px 38px rgba(255, 235, 59, 0.8), inset 0 3px 10px rgba(255, 255, 255, 0.3);
        font-weight: 900;
        text-shadow: 1px 1px 3px rgba(245, 127, 23, 0.7);
      }
      .cr-app-title {
        color: #f57f17;
        text-decoration: overline double #ffeb3b;
        letter-spacing: 1.5px;
      }
    `,
    users: 1098,
    tags: ["yellow", "lemon", "citrus", "bright"],
    createdAt: "2024-01-28T10:25:00Z",
    updatedAt: "2024-01-28T10:25:00Z",
  },
  {
    id: "55",
    slug: "mahogany-wood",
    name: "Mahogany Wood",
    description: "Rich mahogany with wooden texture feel",
    author: "WoodCraft",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(180deg, #3e2723 0px, #4e342e 22px, #5d4037 44px, #4e342e 66px, #3e2723 88px);
        border: 7px ridge #6d4c41;
        box-shadow: 0 22px 58px rgba(62, 39, 35, 0.8), inset 0 5px 25px rgba(109, 76, 65, 0.3);
        border-radius: 8px;
        filter: sepia(18%) contrast(1.12);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 45deg, #5d4037, #6d4c41, #795548, #6d4c41, #5d4037);
        color: white;
        border-radius: 10px;
        border: 4px outset #efebe9;
        box-shadow: 0 10px 32px rgba(93, 64, 55, 0.7), inset 0 2px 8px rgba(239, 235, 233, 0.2);
        font-family: 'Georgia', serif;
        text-transform: capitalize;
      }
      .cr-app-title {
        color: #efebe9;
        line-height: 1.8;
        letter-spacing: 0.8px;
      }
    `,
    users: 1234,
    tags: ["brown", "wood", "mahogany", "rich"],
    createdAt: "2024-01-25T09:40:00Z",
    updatedAt: "2024-01-25T09:40:00Z",
  },
  {
    id: "56",
    slug: "powder-blue",
    name: "Powder Blue",
    description: "Soft powder blue with gentle touch",
    author: "SoftTouch",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=soft",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: radial-gradient(ellipse at 70% 30%, #e3f2fd 0%, #bbdefb 35%, #90caf9 70%, #bbdefb 100%);
        border: 6px solid #64b5f6;
        border-radius: 38px;
        box-shadow: 0 20px 55px rgba(100, 181, 246, 0.5), inset 0 0 45px rgba(227, 242, 253, 0.6);
        backdrop-filter: blur(12px) brightness(1.08);
      }
      .cr-payment-method-button {
        background: repeating-linear-gradient(90deg, #42a5f5 0px, #64b5f6 25px, #42a5f5 50px);
        color: white;
        border-radius: 25px;
        border: 4px groove #0d47a1;
        box-shadow: 0 12px 38px rgba(66, 165, 245, 0.7), inset 0 3px 10px rgba(255, 255, 255, 0.3);
        font-weight: 700;
        text-shadow: 2px 2px 5px rgba(13, 71, 161, 0.8);
      }
      .cr-app-title {
        color: #0d47a1;
        font-style: oblique;
        letter-spacing: 1px;
      }
    `,
    users: 1789,
    tags: ["blue", "powder", "soft", "gentle"],
    createdAt: "2024-01-22T11:35:00Z",
    updatedAt: "2024-01-22T11:35:00Z",
  },
  {
    id: "57",
    slug: "brick-red",
    name: "Brick Red",
    description: "Solid brick red with urban industrial feel",
    author: "UrbanBrick",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(45deg, #b71c1c 0px, #c62828 18px, #d32f2f 36px, #c62828 54px, #b71c1c 72px);
        border: 7px ridge #e53935;
        box-shadow: 0 20px 52px rgba(183, 28, 28, 0.6), inset 0 0 40px rgba(211, 47, 47, 0.3);
        border-radius: 5px;
        filter: contrast(1.15) saturate(1.1);
      }
      .cr-payment-method-button {
        background: radial-gradient(circle at top, #d32f2f 0%, #c62828 50%, #b71c1c 100%);
        color: white;
        border-radius: 8px;
        border: 4px inset #ffcdd2;
        box-shadow: 0 10px 32px rgba(211, 47, 47, 0.7), inset 0 2px 8px rgba(255, 205, 210, 0.2);
        font-weight: 700;
        text-transform: uppercase;
      }
      .cr-app-title {
        color: #ffcdd2;
        font-family: 'Arial Black', sans-serif;
        letter-spacing: 0.8px;
      }
    `,
    users: 967,
    tags: ["red", "brick", "industrial", "urban"],
    createdAt: "2024-01-30T12:10:00Z",
    updatedAt: "2024-01-30T12:10:00Z",
  },
  {
    id: "58",
    slug: "periwinkle-blue",
    name: "Periwinkle Blue",
    description: "Delicate periwinkle with floral inspiration",
    author: "FloralBlue",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: conic-gradient(from 90deg at 60% 40%, #e8eaf6 0deg, #c5cae9 90deg, #9fa8da 180deg, #c5cae9 270deg, #e8eaf6 360deg);
        border: 6px solid #7986cb;
        border-radius: 32px;
        box-shadow: 0 20px 55px rgba(121, 134, 203, 0.5), inset 0 0 45px rgba(232, 234, 246, 0.6);
        transform: rotate(-0.5deg);
      }
      .cr-payment-method-button {
        background: linear-gradient(to top right, #5c6bc0 0%, #7986cb 50%, #9fa8da 100%);
        color: white;
        border-radius: 20px;
        border: 4px ridge #1a237e;
        box-shadow: 0 12px 38px rgba(92, 107, 192, 0.7), inset 0 3px 10px rgba(255, 255, 255, 0.3);
        font-weight: 700;
        text-shadow: 2px 2px 5px rgba(26, 35, 126, 0.8);
      }
      .cr-app-title {
        color: #1a237e;
        text-decoration: underline dotted #7986cb;
        line-height: 1.8;
      }
    `,
    users: 1345,
    tags: ["blue", "periwinkle", "floral", "delicate"],
    createdAt: "2024-01-26T14:45:00Z",
    updatedAt: "2024-01-26T14:45:00Z",
  },
  {
    id: "59",
    slug: "apricot-soft",
    name: "Apricot Soft",
    description: "Gentle apricot with peachy warmth",
    author: "PeachyDesigns",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=peach",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-radial-gradient(circle at 40% 60%, #fff3e0 0px, #ffe0b2 32px, #ffcc80 64px, #ffe0b2 96px, #fff3e0 128px);
        border: 7px dotted #ffb74d;
        border-radius: 50px;
        box-shadow: 0 22px 58px rgba(255, 183, 77, 0.5), inset 0 0 48px rgba(255, 243, 224, 0.6);
        backdrop-filter: brightness(1.05);
      }
      .cr-payment-method-button {
        background: conic-gradient(from 180deg, #ffa726, #ffb74d, #ffcc80, #ffb74d, #ffa726);
        color: white;
        border-radius: 35px;
        border: 5px double #e65100;
        box-shadow: 0 12px 38px rgba(255, 167, 38, 0.7), inset 0 3px 10px rgba(255, 255, 255, 0.3);
        font-weight: 700;
        text-shadow: 2px 2px 5px rgba(230, 81, 0, 0.8);
      }
      .cr-app-title {
        color: #e65100;
        font-style: italic;
        text-decoration: overline wavy #ffa726;
      }
    `,
    users: 1567,
    tags: ["orange", "apricot", "soft", "peachy"],
    createdAt: "2024-01-18T10:55:00Z",
    updatedAt: "2024-01-18T10:55:00Z",
  },
  {
    id: "60",
    slug: "pistachio-green",
    name: "Pistachio Green",
    description: "Nutty pistachio green with organic feel",
    author: "NuttyDesigns",
    status: "approved",
    visibility: "public",
    css: `
      .cr-payment-modal {
        background: repeating-linear-gradient(60deg, #dcedc8 0px, #c5e1a5 28px, #aed581 56px, #c5e1a5 84px, #dcedc8 112px);
        border: 6px ridge #9ccc65;
        border-radius: 28px;
        box-shadow: 0 20px 52px rgba(156, 204, 101, 0.5), inset 0 0 42px rgba(220, 237, 200, 0.6);
        filter: saturate(1.15) contrast(1.05);
      }
      .cr-payment-method-button {
        background: radial-gradient(ellipse at center, #8bc34a 0%, #9ccc65 50%, #aed581 100%);
        color: white;
        border-radius: 22px;
        border: 4px groove #33691e;
        box-shadow: 0 12px 38px rgba(139, 195, 74, 0.6), inset 0 3px 10px rgba(255, 255, 255, 0.2);
        font-weight: 700;
        text-transform: lowercase;
      }
      .cr-app-title {
        color: #33691e;
        letter-spacing: 1px;
        line-height: 1.8;
      }
    `,
    users: 1123,
    tags: ["green", "pistachio", "organic", "nutty"],
    createdAt: "2024-01-27T09:30:00Z",
    updatedAt: "2024-01-27T09:30:00Z",
  },
];

// Theme store
export const themeStore = proxy({
  theme: "light",
  themes: mockThemes,
  currentTheme: null as Theme | null,
  filter: {
    search: "",
    tags: [],
    status: undefined,
    visibility: undefined,
  } as ThemeFilter,

  // Actions
  setCurrentTheme: (theme: Theme | null) => {
    themeStore.currentTheme = theme;
  },

  updateFilter: (newFilter: Partial<ThemeFilter>) => {
    Object.assign(themeStore.filter, newFilter);
  },

  getFilteredThemes: () => {
    return themeStore.themes.filter((theme) => {
      // Only show approved themes
      if (theme.status !== "approved") {
        return false;
      }

      const matchesSearch =
        !themeStore.filter.search ||
        theme.name.toLowerCase().includes(themeStore.filter.search.toLowerCase()) ||
        theme.description.toLowerCase().includes(themeStore.filter.search.toLowerCase()) ||
        theme.author.toLowerCase().includes(themeStore.filter.search.toLowerCase());

      return matchesSearch;
    });
  },
});

// Popular tags
export const popularTags = ["dark", "light", "minimal", "neon", "cyberpunk", "nature", "business", "gaming", "modern", "retro"];
