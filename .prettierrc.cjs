module.exports = {
	useTabs: false,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
	pluginSearchDirs: false,
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
