<script>
	import TextField from '../general/textField.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	function onSubmit() {
		dispatch('submit', {
			item
		});
	}

	export let item = {
		name: '',
		memberTitles: []
	};

	export let title = '';

	let membersStringed = item?.memberTitles?.toString();

	$: item.memberTitles = membersStringed.split(',');
</script>

<h1>{title}</h1>
<TextField inputLabel={'Name'} inputPlaceholder="Name of the item" bind:textValue={item.name} />
<TextField
	inputLabel={'Members'}
	inputPlaceholder="Member titles (comma separated)"
	bind:textValue={membersStringed}
/>
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
