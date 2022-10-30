<script>
	// @ts-nocheck
	import TextField from '../general/textField.svelte';
	import { createEventDispatcher } from 'svelte';

	import * as Icons from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Select from 'svelte-select';

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

	let selectableIcons = [];

	let keys = Object.keys(Icons);
	for (const key of Object.entries(Icons)) {
		selectableIcons.push({
			value: key[0],
			label: key[1].iconName
		});
	}
	console.log(selectableIcons);

	let selectedIcon = role.icon || '';
	const handleSelect = (e) => {
		console.log(e.detail.value);
		selectedIcon = e.detail.value;
	};
</script>

<h1>{title}</h1>
<TextField inputLabel={'Name'} inputPlaceholder="Name" bind:textValue={role.name} />
<TextField
	inputLabel={'Description'}
	inputPlaceholder="Description"
	bind:textValue={role.description}
/>
<!-- <TextField inputLabel={'Icon'} inputPlaceholder="Icon" bind:textValue={role.icon} /> -->

<div class="themed-select item">
	Icon
	<Fa size="lg" class="role-icon" icon={Icons[selectedIcon]} />

	<Select
		items={selectableIcons}
		placeholder={'Select..'}
		value={null}
		on:select={(e) => handleSelect(e)}
	/>
</div>

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

<style>
	.themed-select {
		--tw-ring-color: transparent;
		--padding: 1em;
		--border: 0.1em solid #641ae6;
		--borderFocusColor: #641ae6;
		--borderRadius: 10px;
		--background: #2a303c;
		--listBackground: #2a303c;
		--itemIsActiveBG: #641ae6;
		--itemHoverBG: #171a20;
		--height: 50px;
	}
</style>
