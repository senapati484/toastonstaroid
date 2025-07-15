# 🤝 Contributing to Toastonstaroid

First off, thank you for considering contributing to Toastonstaroid! It's people like you that make this library awesome for everyone. 🌟

## 🗺 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Creating New Variants](#-creating-new-variants)
- [Submitting Changes](#-submitting-changes)
- [Style Guide](#-style-guide)
- [Community](#-community)

## 📜 Code of Conduct

This project and everyone participating in it are governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [sayan4.vercel.app](https://sayan4.vercel.app).

## 🚀 Getting Started

1. **Fork the repository**

```bash
# Clone your fork
git clone https://github.com/your-username/toastonstaroid.git

# Navigate to the project
cd toastonstaroid

# Install dependencies
npm install
# or with yarn
yarn install
```

2. **Create a branch**

```bash
git checkout -b feature/your-feature-name
```

## 💻 Development Setup

1. **Install dependencies**

```bash
npm install --legacy-peer-deps
```

2. **Start development environment**

```bash
# Watch mode
npm run watch

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 🎨 Creating New Variants

1. **Create a new variant file**

```jsx
// src/variants/YourVariant.jsx
import React from "react";
import { animations, dimensions } from "../styles";

const YourVariant = ({ message, ...props }) => {
  // Your implementation
};

export default YourVariant;
```

2. **Add variant styles**

```jsx
// src/variants/styles.js
export const variantStyles = {
  yourVariant: {
    // Your styles
  },
};
```

3. **Export your variant**

```jsx
// src/index.js
export { default as YourVariant } from "./variants/YourVariant";
```

### 🎯 Variant Guidelines

- Use React hooks for animations
- Implement proper cleanup in useEffect
- Support all standard toast props
- Include proper TypeScript types
- Add unit tests
- Document your variant

## 📝 Submitting Changes

1. **Commit your changes**

```bash
git add .
git commit -m "feat: add awesome new feature"
```

2. **Push to your fork**

```bash
git push origin feature/your-feature-name
```

3. **Open a Pull Request**
   - Use our PR template
   - Include screenshots/GIFs for UI changes
   - Update documentation if needed
   - Add tests for new features

## 📐 Style Guide

### Code Style

- Use modern JavaScript features
- Follow ESLint configuration
- Use meaningful variable names
- Comment complex logic
- Keep functions small and focused

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

### Component Structure

```jsx
// Template for new components
import React, { useEffect, useRef } from "react";
import { animations, dimensions } from "../styles";

const YourComponent = ({
  message,
  description,
  variant = "default",
  onClose,
  style,
  ...props
}) => {
  // Hooks
  const componentRef = useRef(null);

  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);

  // Render
  return <div>{/* Your JSX */}</div>;
};

export default YourComponent;
```

## 👥 Community

- Join our [Discord](https://discord.gg/your-server)
- Follow updates on [Twitter](https://twitter.com/your-handle)
- Read our [Blog](https://sayan4.vercel.app/blog)

## 🎯 What to Contribute?

1. **New Toast Variants**

   - Creative animations
   - Unique effects
   - Theme integration

2. **Performance Improvements**

   - Animation optimization
   - Bundle size reduction
   - Render performance

3. **Documentation**

   - Examples
   - Use cases
   - Tutorials

4. **Testing**
   - Unit tests
   - Integration tests
   - Performance tests

## 🌟 Recognition

Contributors will be:

- Listed in our README
- Mentioned in release notes
- Given credit in documentation

## ❓ Questions?

Feel free to:

- Open an issue
- Contact maintainers
- Join our community channels

---

🙏 Thank you for contributing to Toastonstaroid!

Visit [sayan4.vercel.app](https://sayan4.vercel.app) for more information about the maintainer and other projects.
