# Turborepo kitchen sink starter

This is an official starter Turborepo with multiple meta-frameworks all working in harmony and sharing packages.

This example also shows how to use [Workspace Configurations](https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces).

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e kitchen-sink
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `storefront`: a [Next.js](https://nextjs.org/) app
- `admin`: a [Vite](https://vitejs.dev/) single page app
- `blog`: a [Remix](https://remix.run/) blog
- `@shared/vitest-presets`: Vitest configurations
- `@shared/logger`: isomorphic logger (a small wrapper around console.log)
- `@shared/ui`: a dummy React UI library with tailwindcss and shadcn
- `@shared/config-typescript`: tsconfig.json's used throughout the monorepo
- `@shared/config-css`: css config files used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [BiomeJS](https://biomejs.dev/pt-br/) for code linting as formatting
- [Vitest](https://vitest.dev/) test runner for all things JavaScript

#### BiomeJS

You can format files and directories using `format` command:

```bash
yarn format
```

You can lint and apply safe fixes to files and directories using the `lint` command:

```bash
yarn lint
```