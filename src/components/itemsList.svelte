<script lang="typescript">
	import ItemCard from '../components/itemCard.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { onMount } from 'svelte';
	import { createItem, getAllItems } from '../api/item';
	import TextField from '../components/general/textField.svelte';
	import Modal from './general/Modal.svelte';

	let items = [];

	onMount(async () => {
		await fetch();
	});

	const fetch = async () => {
		const res = await getAllItems();
		items = res;
	};

	const create = async (e) => {
		e.preventDefault();
		const membersArray = members.split(',');
		console.log(membersArray);
		const res = await createItem({ name, memberTitles: membersArray });
		fetch();
	};

	let name = '';
	let members = '';

	let letShowCreateModal = false;
</script>

<svelte:head>
	<title>Index page</title>
</svelte:head>

<div class="grid grid-cols-4">
	{#each items as item}
		<div>
			<ItemCard {item} on:item-deleted={fetch} />
		</div>
	{/each}
</div>

<span
	on:click={(e) => {
		console.log('hi');
		letShowCreateModal = true;
	}}
	><PlusCircleIcon />
</span>

{#if letShowCreateModal}
	<Modal>
		<h1>Create a new rotation item</h1>
		<TextField inputLabel={'Name'} inputPlaceholder="Name of the item" bind:textValue={name} />
		<TextField
			inputLabel={'Members'}
			inputPlaceholder="Member titles (comma separated)"
			bind:textValue={members}
		/>
		<button
			class="btn btn-outline btn-error"
			type="button"
			on:click={() => {
				letShowCreateModal = false;
			}}>Close</button
		>
		<button type="button" class="btn btn-outline btn-info" on:click={create}>Save</button>
	</Modal>
{/if}
