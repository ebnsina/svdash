<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import FileUpload from './FileUpload.svelte';

	const { Story } = defineMeta({
		title: 'Forms/FileUpload',
		component: FileUpload,
		tags: ['autodocs'],
		parameters: { layout: 'padded' },
		args: { label: 'Attachments', class: 'w-[28rem] max-w-full' }
	});
</script>

<Story name="Empty" />
<Story
	name="With files"
	args={{
		files: [
			{ name: 'q3-invoice.pdf', size: 248000, status: 'done', progress: 100 },
			{ name: 'logo-dark.png', size: 91000, status: 'done', progress: 100 }
		]
	}}
/>
<Story
	name="Uploading"
	args={{
		files: [{ name: 'annual-report.pdf', size: 4300000, status: 'uploading', progress: 62 }]
	}}
/>
<Story
	name="Rejected file"
	args={{
		files: [
			{ name: 'raw-footage.mov', size: 48000000, status: 'error', error: 'Over the 10 MB limit' }
		]
	}}
/>
<Story name="Field error" args={{ error: 'At least one attachment is required.' }} />
<Story name="Disabled" args={{ disabled: true }} />
