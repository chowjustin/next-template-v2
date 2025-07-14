# Next.js 15 + Tailwind CSS v4 + TypeScript Starter

This is a starter template for building modern web applications with Next.js 15, Tailwind CSS v4, and TypeScript. It's packed with features to streamline your development process and build high-quality, scalable applications.

-----

## 🚀 Features

This starter template is packed with the following features:

  * **⚡️ Next.js 15:** The latest version of the popular React framework, with support for the App Router.
  * **⚛️ React 19:** The newest version of the React library for building user interfaces.
  * **✨ TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
  * **💨 Tailwind CSS v4:** A utility-first CSS framework for rapid UI development.
  * **💎 Pre-built Components:** A collection of ready-to-use components that automatically adapt to your brand colors.
  * **📈 Absolute Import and Path Alias:** Import components using the `@/` prefix.
  * **📏 ESLint:** Find and fix problems in your code, and automatically sort your imports.
  * **🐶 Husky & Lint Staged:** Run scripts on your staged files before they are committed to ensure code quality.
  * **🤖 Conventional Commit Lint:** Enforce a consistent commit message format.
  * **🗺 Site Map:** Automatically generate a `sitemap.xml` for your site.

-----

## Getting Started

### 1\. Clone the template

You can use this repository as a template to create a new project.

1. Using bash or other terminal

   ```
   git clone https://github.com/chowjustin/next-template-v2
   ```

2. By clicking use this template

   ![image](https://github.com/user-attachments/assets/40a5bbd6-6be1-4059-b003-c1cc6bfce56a)


   

### 2\. Install dependencies

It is recommended to use `pnpm` to install the dependencies:

```bash
pnpm install
```

### 3\. Run the development server

Start the development server with the following command:

```bash
pnpm dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the result. You can start editing the page by modifying `src/app/page.tsx`.

### 4\. Customize the template

There are a few things you need to change to customize the template:

  * **`!CHANGETHIS` comments:** Find all comments with `!CHANGETHIS` in the code and follow the instructions.
  * **`package.json`:** Change the package name to your project's name.
  * **Favicons and other assets:** Replace the default favicons and other assets with your own.

### 5\. Cleanup Script

This starter template includes several optional feature modules. If you don't need a specific feature, you can run the cleanup script to remove the associated files, dependencies, and provider configurations, keeping your project clean.

### Usage

To use the script, run the following command from the project root:

```bash
./cleanup.sh <component_name>
```
Available components:
You can replace <component_name> with one of the following options:
* `api`: Removes all files and dependencies related to API interaction and state management. This includes axios, @tanstack/react-query, zustand, react-hot-toast, and the authentication hooks/stores.
* `table`: Removes the Table component, which is built on @tanstack/react-table, and its related files and dependencies like nuqs.
* `form`: Removes the advanced form components and their dependencies, including react-hook-form, react-dropzone, react-select, and the lightbox modal.
* `button`: Removes the custom Button, IconButton, and related link components (ButtonLink, IconLink).
* `dialog`: Removes the custom ConfirmationDialog, and its dependencies.

Note: if the script is not executeable yet, you can run the following command
```bash
chmod +x cleanup.sh
```

-----

## Commit Message Convention

This starter template uses the [Conventional Commits](https://www.conventionalcommits.org/) specification. This ensures a consistent and readable commit history.

