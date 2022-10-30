<script>
	// @ts-nocheck
	import TextField from '../general/textField.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let role = {
		name: '',
		description: '',
		icon: ''
	};

	console.log(role);

	function close() {
		dispatch('close');
	}

	function onSubmit() {
		dispatch('submit', {
			name: role.name,
			description: role.description,
			icon: role.icon
		});
	}

	export let title = '';
</script>

<h1>{title}</h1>
<TextField inputLabel={'Name'} inputPlaceholder="Name" bind:textValue={role.name} />
<TextField
	inputLabel={'Description'}
	inputPlaceholder="Description"
	bind:textValue={role.description}
/>
<TextField inputLabel={'Icon'} inputPlaceholder="Icon" bind:textValue={role.icon} />

<div>
	<button
		class="btn btn-outline btn-error"
		type="button"
		on:click={() => {
			close();
		}}>Close</button
	>
	<button type="button" class="btn btn-outline btn-info" on:click={onSubmit}>Save</button>
</div>
