import type { Preview } from '@storybook/sveltekit';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import '../src/lib/tokens.css';

const preview: Preview = {
	parameters: {
		layout: 'centered',
		controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
		a11y: { test: 'error' },
		options: {
			storySort: {
				order: [
					'Design Tokens',
					'Layout',
					'Navigation',
					'Data Display',
					'Forms',
					'Feedback',
					'Buttons',
					'Settings',
					'Auth'
				]
			}
		},
		viewport: {
			options: {
				mobile: {
					name: 'Mobile — 390',
					styles: { width: '390px', height: '844px' },
					type: 'mobile'
				},
				tablet: {
					name: 'Tablet — 820',
					styles: { width: '820px', height: '1180px' },
					type: 'tablet'
				},
				desktop: {
					name: 'Desktop — 1440',
					styles: { width: '1440px', height: '900px' },
					type: 'desktop'
				},
				...INITIAL_VIEWPORTS
			}
		}
	},
	globalTypes: {
		theme: {
			description: 'Colour scheme',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'Light' },
					{ value: 'dark', title: 'Dark' }
				],
				dynamicTitle: true
			}
		}
	},
	initialGlobals: { theme: 'light' },
	decorators: [
		(story, context) => {
			const dark = context.globals.theme === 'dark';
			document.documentElement.classList.toggle('dark', dark);
			document.body.style.background = 'var(--c-canvas)';
			document.body.style.color = 'var(--c-fg)';
			return story();
		}
	]
};

export default preview;
