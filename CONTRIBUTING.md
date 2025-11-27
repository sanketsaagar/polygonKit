# Contributing to PolygonKit

Thank you for your interest in contributing to PolygonKit! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js v18 or higher
- pnpm v8 or higher (recommended) or npm/yarn

### Getting Started

1. Fork and clone the repository

```bash
git clone https://github.com/your-username/polygon-kit.git
cd polygon-kit
```

2. Install dependencies

```bash
pnpm install
```

3. Start development mode

```bash
pnpm dev
```

4. Run type checking

```bash
pnpm type-check
```

5. Run linting

```bash
pnpm lint
```

## Project Structure

```
polygon-kit/
├── src/
│   ├── components/      # React components
│   │   ├── Wallet/      # Wallet connection components
│   │   ├── Identity/    # Identity and profile components
│   │   ├── Transaction/ # Transaction components
│   │   ├── Token/       # Token display components
│   │   └── Swap/        # Swap interface components
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── constants/       # Constants and chain configs
│   └── index.ts         # Main export file
├── examples/            # Example applications
├── dist/                # Build output
└── package.json
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types for all props and return values
- Avoid using `any` type
- Export types from the main index file

### React Components

- Use functional components with hooks
- Use meaningful component and prop names
- Add JSDoc comments for complex components
- Keep components focused and single-purpose

### Styling

- Use TailwindCSS utility classes
- Support dark mode with `dark:` variants
- Allow className override for customization
- Maintain consistent spacing and sizing

### Code Style

- Follow the existing code style
- Use ESLint for code formatting
- Keep functions small and focused
- Add comments for complex logic

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

or

```bash
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Write clean, maintainable code
- Follow the coding guidelines above
- Add or update tests if applicable
- Update documentation if needed

### 3. Test Your Changes

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build
```

### 4. Commit Your Changes

Use clear and descriptive commit messages:

```bash
git commit -m "feat: add new token selector component"
git commit -m "fix: resolve wallet connection issue"
git commit -m "docs: update README with new examples"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin your-branch-name
```

Then create a pull request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots for UI changes
- Breaking changes highlighted

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] TypeScript types are properly defined
- [ ] Code has been tested locally
- [ ] Documentation has been updated
- [ ] Commit messages are clear and descriptive

### Pull Request Description

Include:
- What changes were made
- Why the changes were made
- How to test the changes
- Screenshots (for UI changes)
- Breaking changes (if any)

Example:

```markdown
## Description
Add a new TokenSelector component for choosing tokens in the swap interface.

## Changes
- Created TokenSelector component
- Added token search functionality
- Updated Swap component to use TokenSelector
- Added tests for TokenSelector

## Testing
1. Import TokenSelector in your app
2. Click to open token selector
3. Search for a token
4. Select a token

## Screenshots
[Add screenshots here]

## Breaking Changes
None
```

## Adding New Components

### Component Template

```tsx
import { YourComponentProps } from '../../types';

export function YourComponent({
  prop1,
  prop2,
  className = '',
}: YourComponentProps) {
  return (
    <div className={`your-styles ${className}`}>
      {/* Component content */}
    </div>
  );
}
```

### Steps

1. Create component file in appropriate directory
2. Define types in `src/types/index.ts`
3. Export from directory's `index.ts`
4. Export from main `src/index.ts`
5. Add documentation to README
6. Create example usage

## Adding New Hooks

### Hook Template

```tsx
import { useState, useEffect } from 'react';

export function useYourHook(param: string) {
  const [state, setState] = useState();

  useEffect(() => {
    // Hook logic
  }, [param]);

  return {
    state,
    // Other return values
  };
}
```

### Steps

1. Create hook file in `src/hooks/`
2. Export from `src/hooks/index.ts`
3. Export from main `src/index.ts`
4. Add documentation to README
5. Create example usage

## Testing

Currently, PolygonKit doesn't have a comprehensive test suite. Contributions to add tests are welcome!

### Manual Testing

1. Build the library

```bash
pnpm build
```

2. Link locally

```bash
pnpm link --global
```

3. Use in a test project

```bash
cd your-test-project
pnpm link --global @polygon/polygon-kit
```

## Documentation

### README Updates

- Keep examples up to date
- Document all new components and hooks
- Include props/parameters tables
- Add usage examples

### Inline Documentation

- Add JSDoc comments for complex functions
- Explain non-obvious logic
- Document edge cases

## Release Process

Releases are handled by maintainers. The process includes:

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag
4. Build and publish to npm

## Community

### Getting Help

- GitHub Issues: Report bugs or request features
- GitHub Discussions: Ask questions or share ideas
- Discord: Join the Polygon community

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- GitHub contributors page
- Release notes

Thank you for contributing to PolygonKit! 🚀
