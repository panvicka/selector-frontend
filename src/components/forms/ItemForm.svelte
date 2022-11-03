<script>
	// @ts-nocheck
	import TextInput from '../general/textInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import Select from 'svelte-select';
	import Fa from 'svelte-fa';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import {
		addToArrayIfKeyValueDoesntExist,
		findByKeyInArray,
		removeFromArrayBasedOnKey
	} from '../../utils/arrayUtils';
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
		memberTitles: [],
		roles: []
	};

	export let allRoles = [];
	export let title = '';

	console.log(allRoles);
	let rolesForSelect = allRoles.map((role) => {
		return {
			value: role._id,
			label: role.name
		};
	});

	let selectedRoles = item.roles || [];

	console.log(selectedRoles);

	let membersStringed = item?.memberTitles?.toString();

	$: item.memberTitles = membersStringed.split(',');
	$: item.roles = selectedRoles;

	const handleSelect = (e) => {
		console.log(e.detail.value);
		let role = findByKeyInArray('_id', e.detail.value, allRoles);
		selectedRoles = addToArrayIfKeyValueDoesntExist(selectedRoles, '_id', role);
		console.log(selectedRoles);
	};

	const deleteTrigger = (roleId) => {
		selectedRoles = removeFromArrayBasedOnKey('_id', roleId, selectedRoles);
	};
</script>

<h1>{title}</h1>
<TextInput
	inputLabel={'Name'}
	styleClass={'input-info'}
	inputPlaceholder="Name of the item"
	bind:textValue={item.name}
/>
<TextInput
	inputLabel={'Members'}
	styleClass={'input-info'}
	inputPlaceholder="Member titles (comma separated)"
	bind:textValue={membersStringed}
/>

<div class="themed-select item">
	Roles
	<Select
		items={rolesForSelect}
		placeholder={'Select..'}
		value={null}
		on:select={(e) => handleSelect(e)}
	/>
</div>

Selected roles:
<div>
	{#each selectedRoles || [] as role}
		<div class="badge badge-ghost">
			<Fa size="lg" class="role-icon" icon={role.icon} />
			{role.name}
			<button
				on:click={() => {
					deleteTrigger(role._id);
				}}><Fa size="xs" id="delete" icon={faXmark} /></button
			>
		</div>
	{/each}
</div>

<div class="buttons">
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
	.buttons {
		margin-top: 3em;
		display: flex;
		justify-content: space-between;
	}

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
