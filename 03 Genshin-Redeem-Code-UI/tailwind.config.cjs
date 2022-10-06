/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		colors: {
			'transparent': 'transparent',
      		'current': 'currentColor',
			'black': '#000',
			'white': '#fff',
			'gray': {
				'400': '#9ca3af',
			},
			'orange': {
				'500': '#f97316',
			},
			'amber': {
				'400': '#fbbf24',
				'500': '#f59e0b',
			},
      		'yellow': {
				'400': '#facc15',
			},
			'blue': {
				'500': '#3b82f6',
				'900': '#1e3a8a',
			},
			'sky': {
				'400': '#38bdf8',
				'500': '#0ea5e9',
			},
			'indigo': {
				'700': '#4338ca',
				'900': '#312e81',
			},
			'violet': {
				'900': '#4c1d95',
			},
			'purple': {
				'200': '#e9d5ff',
			},
			'fuschia': {
				'500': '#d946ef',
			},
			'slate': {
				'100': '#f1f5f9',
				'200': '#e2e8f0',
				'400': '#94a3b8',
				'500': '#64748b',
				'800': '#1e293b',
				'900': '#0f172a'
			},
			'rose': {
				'600': '#e11d48',
				'700': '#be123c',
			}
		},
		extend: {},
	},
	plugins: [],
}
