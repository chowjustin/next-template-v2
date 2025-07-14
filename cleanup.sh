#!/bin/bash

# This script removes optional components, their dependencies, and related providers.
#
# Usage:
# ./cleanup.sh <component>
#
# Example:
# ./cleanup.sh table

# --- Safety Check ---
# Ensure the script is run from the project root.
if [ ! -f "package.json" ]; then
  echo "Error: This script must be run from the root of the project."
  exit 1
fi

if [ -z "$1" ]; then
  echo "Usage: $0 <component_name>"
  echo "Available components: table, form, button, api"
  exit 1
fi

component_to_remove=$1
dependencies_to_remove=""
providers_file="src/app/providers.tsx"

# Function to delete a single line containing a specific pattern.
delete_line() {
  local pattern=$1
  local file=$2
  # Use a temporary file to avoid issues with sed's in-place editing on different systems
  tmp_file=$(mktemp)
  # grep -v inverts the match, printing all lines that DO NOT contain the pattern.
  grep -v "$pattern" "$file" > "$tmp_file" && mv "$tmp_file" "$file"
}

# Function to delete a multiline block based on start and end patterns.
# Usage: delete_multiline_block "start_pattern" "end_pattern" "path/to/file.tsx"
delete_multiline_block() {
    local start_pattern=$1
    local end_pattern=$2
    local file=$3
    # Use sed to delete lines from start_pattern to end_pattern
    # Adding .bak for cross-platform compatibility with sed -i
    sed -i.bak "/${start_pattern}/,/${end_pattern}/d" "$file"
    rm "${file}.bak"
}

# Function to unwrap a component on a single line, leaving its children.
# This function is kept for the 'table' case, as NuqsAdapter is a single line.
unwrap_component() {
  local tag=$1
  local file=$2
  tmp_file=$(mktemp)
  # This sed command finds <Component>(...)</Component> and replaces it with just (...)
  sed "s|<${tag}>\\(.*\\)</${tag}>|\\1|g" "$file" > "$tmp_file" && mv "$tmp_file" "$file"
}


echo "Preparing to remove the '$component_to_remove' component..."

case $component_to_remove in
  "table")
    echo "Deleting table files..."
    rm -rf src/components/table
    rm -rf src/app/sandbox/table
    rm -f src/lib/pagination.ts

    dependencies_to_remove="@tanstack/react-table nuqs"

    echo "Removing NuqsAdapter from $providers_file..."
    delete_line "import { NuqsAdapter }" "$providers_file"
    unwrap_component "NuqsAdapter" "$providers_file"
    ;;

  "form")
    echo "Deleting form files..."
    rm -rf src/components/form
    rm -rf src/app/sandbox/form
    rm -rf src/hooks
    rm -f src/types/dropzone.ts
    rm -f src/lib/helper.ts
    rm -f src/components/LightboxModal.tsx
    
    dependencies_to_remove="react-hook-form react-dropzone yet-another-react-lightbox react-select"
    ;;

  "dialog")
    echo "Deleting dialog files..."
    rm -rf src/components/dialog
    
    dependencies_to_remove="@headlessui/react"
    ;;

  "button")
    echo "Deleting button and related link files..."
    rm -rf src/components/button
    rm -rf src/app/sandbox/button
    rm -f src/components/links/ButtonLink.tsx
    rm -f src/components/links/IconLink.tsx
    ;;

  "api")
    echo "Deleting API and state management files..."
    rm -f src/lib/api.ts
    rm -f src/lib/cookies.ts
    rm -f src/hooks/useUploadFileMutation.ts
    rm -rf src/app/stores
    rm -rf src/components/hoc
    rm -f src/types/api.ts
    rm -f src/types/login.ts
    rm -f src/types/user.ts
    
    dependencies_to_remove="axios universal-cookie @tanstack/react-query zustand auto-zustand-selectors-hook immer react-hot-toast"

    echo "Removing QueryClientProvider and Toaster from $providers_file..."
    
    # Remove single-line imports
    delete_line "import { Toaster }" "$providers_file"
    delete_line "import api from " "$providers_file"
    
    # Remove multiline blocks
    delete_multiline_block "import {" "from \"@tanstack/react-query\";" "$providers_file"
    delete_multiline_block "const defaultQueryFn" "};" "$providers_file"
    delete_multiline_block "const queryClient" "});" "$providers_file"

    # Remove the QueryClientProvider wrapper and Toaster component
    delete_line "<QueryClientProvider" "$providers_file"
    delete_line "</QueryClientProvider>" "$providers_file"
    delete_line "<Toaster" "$providers_file"
    ;;

  *)
    echo "Error: Unknown component '$component_to_remove'."
    echo "Available components: table, form, button, api"
    exit 1
    ;;
esac

if [ -n "$dependencies_to_remove" ]; then
  echo "Uninstalling dependencies: $dependencies_to_remove"
  pnpm uninstall $dependencies_to_remove
else
  echo "No dependencies to uninstall for '$component_to_remove'."
fi

echo "✅ Component '$component_to_remove' has been removed."
echo "Running 'pnpm install' to clean up the lockfile..."
pnpm install

echo "✨ Cleanup complete!"