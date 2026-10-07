# Testing Strategy & Configuration

## Test Framework
- **Test Runner**: Vitest 4.1.8
- **DOM Simulation**: `jsdom` (v29.1.0)
- **Testing Library**: `@testing-library/react` (v16.0.0) + `@testing-library/jest-dom` (v6.6.0)
- **Config**: `vitest.config.ts`

## Test Execution Commands
- Single Run: `npm run test` (runs `vitest run`)
- Watch Mode: `npm run test:watch` (runs `vitest`)

## Test File Conventions
- Unit and integration test files follow the pattern `src/**/*.{test,spec}.{ts,tsx}`.
- Test setup file configured as `src/test/setup.ts`.
