# 🤝 Contributing to Toastonstaroid

Thank you for your interest in contributing to Toastonstaroid! This document will guide you through the contribution process and help you understand how to make meaningful contributions to the project.

## 🗺 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Creating New Variants](#-creating-new-variants)
- [Making Changes](#-making-changes)
- [Code Style Guide](#-code-style-guide)
- [Submitting Changes](#-submitting-changes)
- [Community](#-community)
- [Recognition](#-recognition)

## 📜 Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report any unacceptable behavior to [sayan4.vercel.app](https://sayan4.vercel.app).

## 🏗 Project Structure

```
src/
├── index.tsx         # Main export and component
├── store.ts          # State management with Zustand
└── variants/         # Toast variant implementations
    ├── base.ts       # Base styles and utilities
    ├── types.ts      # TypeScript type definitions
    ├── index.ts      # Variant exports
    ├── success.ts    # Success variant
    ├── error.ts      # Error variant
    ├── warning.ts    # Warning variant
    ├── info.ts       # Info variant
    ├── fire.ts       # Fire animation variant
    ├── rain.ts       # Rain animation variant
    ├── smoke.ts      # Smoke animation variant
    └── cyberpunk.ts  # Cyberpunk theme variant
```

## 🚀 Getting Started

1. **Fork the repository**

```bash
# Clone your fork
git clone https://github.com/your-username/toastonstaroid.git
cd toastonstaroid

# Install dependencies
npm install
# or with yarn
yarn

# Create a new branch for your changes
git checkout -b feature/your-feature-name
```

## 💻 Development Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- Git

### Scripts

```bash
# Start development server
npm run dev

# Build the library
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Run type checking
npm run type-check
```

## 🎨 Creating New Variants

### 1. Create a New Variant File

Create a new TypeScript file in the `src/variants` directory following the naming convention `variant-name.ts`.

### 2. Implement the Variant

Use this template for new variants:

```typescript
import { gsap } from 'gsap';
import { glassEffect } from './base';
import type { ToastConfig, ToastStyles } from './types';

const createVariantEffect = (element: HTMLElement) => {
  // Your effect implementation
  // Return a cleanup function if needed
  return () => {
    // Cleanup code
  };
};

export const variantNameToast: ToastConfig = {
  animation: (element: HTMLElement, position: string) => {
    // Animation implementation
  },
  containerStyles: {
    ...glassEffect,
    '--toast-bg': 'rgba(30, 58, 138, 0.15)',
    '--toast-border': '1px solid rgba(96, 165, 250, 0.2)',
    '--toast-shadow': '0 8px 32px 0 rgba(59, 130, 246, 0.1)',
    // Add any additional styles
  },
  // Other configuration options
};
```

### 3. Export the Variant

Add your new variant to `src/variants/index.ts`:

```typescript
export * from './variant-name';
```

### 4. Add to Type Definitions

Update the `ToastType` in `src/store.ts` if adding a new variant type.

### Variant Guidelines

- **Performance**: Keep animations smooth and efficient
- **Accessibility**: Ensure proper contrast and ARIA attributes
- **Responsive**: Work well on all screen sizes
- **Cleanup**: Properly clean up any event listeners or GSAP instances
- **Type Safety**: Include proper TypeScript types
- **Documentation**: Add JSDoc comments for public APIs

## 🛠 Making Changes

### Before You Start

1. Check existing issues to avoid duplicates
2. Open an issue to discuss major changes
3. Keep changes focused and atomic

### Coding Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Prefer named exports
- Keep components small and focused
- Write meaningful variable and function names
- Add comments for complex logic

### Testing

- Write tests for new features
- Update tests when fixing bugs
- Ensure all tests pass before submitting

## 📝 Submitting Changes

1. **Update Documentation**
   - Update README.md if needed
   - Add JSDoc comments for new APIs
   - Document any breaking changes

2. **Commit Your Changes**

```bash
# Stage changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new cyberpunk variant"
```

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style/formatting
- `refactor:` Code changes that don't fix bugs or add features
- `perf:` Performance improvements
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

3. **Push to Your Fork**

```bash
git push origin feature/your-feature-name
```

4. **Open a Pull Request**
   - Use the PR template
   - Describe your changes and motivation
   - Include screenshots/GIFs for UI changes
   - Reference related issues
   - Ensure all CI checks pass

## 👥 Community

- **Issues**: Use GitHub issues for bug reports and feature requests
- **Discussion**: Join our community forum (coming soon)
- **Contact**: Reach out to [sayan4.vercel.app](https://sayan4.vercel.app)

## 🌟 Recognition

All contributors are recognized in the following ways:

- Listed in the project's README
- Mentioned in release notes
- Given credit in the documentation
- Invited to join the core team for significant contributions

## 🙏 Thank You!

Your contributions make open source amazing! We appreciate your time and effort in making Toastonstaroid better for everyone.

Visit [sayan4.vercel.app](https://sayan4.vercel.app) for more about the maintainer and other projects.
