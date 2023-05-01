module.exports = {
	plugins: [require("prettier-plugin-tailwindcss"), require.resolve("prettier-plugin-astro")],
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
