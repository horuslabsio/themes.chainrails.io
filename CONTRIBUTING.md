# Contributing to Chainrails Themes

We welcome contributions to Chainrails Themes! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **Bun** (recommended) or **npm**

### Development Setup

1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/themes.chainrails.io.git
   cd themes.chainrails.io
   ```

3. Install dependencies:
   ```bash
   # Using Bun (recommended)
   bun install
   
   # Or using npm
   npm install
   ```

4. Start the development server:
   ```bash
   # Using Bun
   bun run dev
   
   # Or using npm
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser

### Build for Production

```bash
# Create production build
bun run build

# Preview production build
bun run preview
```

## 🎨 Creating Themes

### Theme Development Workflow

1. **Navigate to Theme Creator**: Go to `/create`
2. **Fill Theme Information**: 
   - Enter a unique theme name
   - Add a description explaining your theme's style and inspiration
   - Choose visibility (public or private)
3. **Continue to Editor**: Click "Continue to Editor" to access the CSS editor
4. **Write CSS**: Target `.chainrails-*` classes to style the modal
5. **Preview**: Use the live preview to see your changes across all 12 modal screens
6. **Save**: Save as draft or submit for review

### CSS Guidelines

- **Target Classes**: Use `.chainrails-*` classes to style modal components
- **Responsiveness**: Ensure your theme works on all screen sizes
- **Accessibility**: Maintain proper contrast ratios for readability
- **Browser Support**: Test across modern browsers

### Theme Approval Criteria

Your theme must meet these requirements to be approved:

- ✅ **Accessibility** - Proper contrast ratios (WCAG AA compliance)
- ✅ **Functionality** - All elements remain usable and clickable
- ✅ **Security** - No malicious code or external resource loading
- ✅ **Quality** - Professional appearance and attention to detail
- ✅ **Responsiveness** - Works properly on mobile and desktop

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Naming Conventions**: Follow existing camelCase for variables, PascalCase for components
- **File Organization**: Place components in appropriate directories
- **Imports**: Use absolute imports where possible

### Component Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Route components
├── types/            # TypeScript type definitions
├── store/            # State management
└── utils/            # Utility functions
```

### Testing

- Test your changes across different theme previews
- Ensure responsive design works on various screen sizes
- Verify accessibility features remain intact

## 📋 Pull Request Process

1. **Create a Feature Branch**: 
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**: 
   - Follow the coding standards
   - Add tests if applicable
   - Update documentation as needed

3. **Test Thoroughly**: 
   - Test theme creation and editing flow
   - Verify preview functionality
   - Check responsive design

4. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "feat: descriptive commit message"
   ```

5. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**: 
   - Use a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

### Commit Message Format

We follow conventional commits:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

- **Environment**: OS, browser, Node.js version
- **Steps to Reproduce**: Clear, numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable

### Feature Requests

For feature requests, please provide:

- **Problem Description**: What problem does this solve?
- **Proposed Solution**: How would you like it to work?
- **Alternatives**: Any alternative solutions you've considered
- **Additional Context**: Any other relevant information

## 🏗️ Project Architecture

### Frontend Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Valtio** - State management

### Key Features

- **Theme Store**: Browse and discover approved themes
- **Theme Creator**: Multi-step theme creation process
- **Theme Editor**: CSS code editor with live preview
- **Mock Modal**: Component for previewing themes across different screens

## 🤝 Community

- **GitHub Discussions**: For questions and community discussions
- **Issues**: For bug reports and feature requests
- **Pull Requests**: For code contributions

## 📄 License

By contributing to Chainrails Themes, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Chainrails Themes! 🎨
