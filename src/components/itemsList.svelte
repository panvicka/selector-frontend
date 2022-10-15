<script lang="typescript">
	import ItemCard from '../components/itemCard.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { onMount } from 'svelte';
	import { createItem, getAllItems } from '../api/item';
	import Modal from './general/Modal.svelte';
	import ItemForm from './forms/ItemForm.svelte';

	let items = [];

	onMount(async () => {
		await fetch();
	});

	const fetch = async () => {
		const res = await getAllItems();
		items = res;
	};

	const handleCreateNew = async (event) => {
		const res = await createItem({
			name: event.detail.item.name,
			memberTitles: event.detail.item.members
		});
		fetch();
		letShowCreateModal = false;
	};

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
		<ItemForm
			title={'create new item'}
			on:submit={handleCreateNew}
			on:close={() => {
				letShowCreateModal = false;
			}}
		/>
	</Modal>
{/if}
