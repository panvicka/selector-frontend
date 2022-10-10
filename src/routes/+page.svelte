<script lang="typescript">
	import ItemCard from '../components/itemCard.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { onMount } from 'svelte';
	import { createItem, getAllItems } from '../api/item';
	import TextField from '../components/general/textField.svelte';

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

<div class="collapse">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		<PlusCircleIcon />
	</div>
	<div class="collapse-content">
		<div class="form-control w-full max-w-xs">
			<TextField inputLabel={'Name'} inputPlaceholder="Name of the item" bind:textValue={name} />
			<TextField
				inputLabel={'Members'}
				inputPlaceholder="Member titles (comma separated)"
				bind:textValue={members}
			/>

			<button class="btn btn-accent" on:click={create}>Create new</button>
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	p {
		max-width: 500px;
		text-align: center;
	}
</style>
