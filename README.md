# Chainrails Themes

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61dafb.svg)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Powered%20by-Vite-646cff.svg)](https://vitejs.dev/)

> A platform for discovering, creating, and publishing custom themes for the Chainrails payment modal.

**Live Demo:** [themes.chainrails.io](https://themes.chainrails.io)

---

## 🎯 Overview

Chainrails Themes extends theming beyond the basic `dark`, `light`, `system` options to support unlimited community-created themes. Developers can browse a curated theme store, creators can build themes with a real-time CSS editor, and themes go through a quality review process before going live.

### ✨ Key Features

- 🎨 **Theme Store** - Browse and discover approved themes
- 🔧 **Theme Creator** - Multi-step theme creation with CSS editor and live preview
- 🔍 **Search & Filter** - Find themes by tags, author, or keywords
- 💾 **Theme Management** - Public, private, and draft themes

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/chainrails/themes.chainrails.io.git
cd themes.chainrails.io

# Install dependencies
bun install

# Start development server
bun run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
bun run build

# Preview production build
bun run preview
```

---

## 🎨 Using Themes

### In Your Application

```tsx
import { ChainrailsModal } from '@chainrails/modal';

// Use built-in theme
<ChainrailsModal theme="dark" />

// With custom or community theme
<ChainrailsModal 
  theme="minimal-white"
/>
```

### Creating Themes

1. **Navigate to Theme Creator**: Go to `/create`
2. **Fill Basic Information**: Enter theme name, description, and visibility settings
3. **Continue to Editor**: Access the CSS editor at `/edit/:theme-name`
4. **Write CSS**: Target `.chainrails-*` classes to style the modal components
5. **Preview**: Use the live preview to see changes across all 12 modal screens
6. **Save**: Save as draft or submit for review

## ✅ Theme Approval Criteria

- **Accessibility** - Proper contrast ratios (WCAG AA compliance)
- **Functionality** - All elements remain usable and interactive
- **Security** - No malicious code or external resource loading
- **Quality** - Professional appearance and attention to detail
- **Responsiveness** - Works properly on all screen sizes

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- Development setup
- Code style guidelines
- Pull request process
- Theme creation workflow
- Bug reporting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
