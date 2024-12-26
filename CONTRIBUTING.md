# Contributing Guidelines

Thank you for your interest in contributing to our project! This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How to Contribute

### 1. Fork and Clone

1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/PROJECT-NAME.git
   cd PROJECT-NAME
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/PROJECT-NAME.git
   ```

### 2. Set Up Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### 3. Make Your Changes

1. Write your code following our coding standards
2. Add or update tests as needed
3. Update documentation if required
4. Ensure all tests pass:
   ```bash
   npm test
   ```

### 4. Commit Your Changes

- Use clear and meaningful commit messages
- Follow conventional commits format:
  ```
  feat: add new feature
  fix: resolve specific issue
  docs: update documentation
  test: add tests
  style: format code
  refactor: restructure code
  ```

### 5. Submit a Pull Request

1. Push your changes to your fork
2. Create a Pull Request from your fork to our main repository
3. Fill in the PR template with all relevant information
4. Wait for review and address any feedback

## Development Guidelines

### Code Style

- Follow the existing code style
- Use ESLint and Prettier for code formatting
- Run linting before committing:
  ```bash
  npm run lint
  ```

### Testing

- Write tests for new features
- Ensure all tests pass before submitting
- Aim for good test coverage

### Documentation

- Update documentation for new features
- Include JSDoc comments for functions
- Update README.md if needed

## Getting Help

- Create an issue for bugs or feature requests
- Join our community chat for questions
- Check existing issues and PRs before creating new ones

## Review Process

1. All PRs require at least one review
2. Address all review comments
3. Ensure CI checks pass
4. Squash commits before merging

Thank you for contributing to our project! 