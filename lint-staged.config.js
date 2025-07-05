module.exports = {
	// Type check TypeScript files
	"**/*.(ts|tsx)": () => "pnpm typecheck",

	// Lint & Prettify TS and JS files
	"**/*.(ts|tsx|js)": () => [
		`pnpm lint:error`,
		`pnpm format:write`,
		`pnpm check`,
	],

	// Prettify only Markdown and JSON files
	"**/*.(md|json)": () => `pnpm format:write`,
};
