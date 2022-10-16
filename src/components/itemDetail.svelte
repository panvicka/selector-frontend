<script>
	import { SettingsIcon } from 'svelte-feather-icons';

	import { getItemById, updateItem } from '../api/item';
	import EventCreator from './eventCreator.svelte';
	import EventTable from './eventTable.svelte';
	import ItemForm from './forms/ItemForm.svelte';
	import Modal from './general/Modal.svelte';

	let createNewEventModalOpened = false;

	export let item;

	let letShowEditModal = false;

	const handleEdit = async (event) => {
		console.log(event.detail);
		const res = await updateItem(item._id, event.detail.item);
		fetch();
		letShowEditModal = false;
	};

	const fetch = async () => {
		const res = await getItemById(item._id);
		item = res;
	};
</script>

<span
	on:click={() => {
		letShowEditModal = true;
	}}
	><SettingsIcon />
</span>

<div class="grid place-items-center prose">
	<h1>{item.name}</h1>

	<ul>
		{#each item.memberTitles as member}
			<p>{member}</p>
		{/each}
	</ul>
</div>

<button
	on:click={() => {
		createNewEventModalOpened = true;
	}}>add new event</button
>

{#if createNewEventModalOpened}
	<Modal>
		<EventCreator
			on:close={() => (createNewEventModalOpened = false)}
			membersTitles={item.membersTitles}
			itemId={item._id}
		/>
	</Modal>
{/if}

{#if letShowEditModal}
	<Modal>
		<ItemForm
			title={'edit item'}
			{item}
			on:submit={handleEdit}
			on:close={() => {
				letShowEditModal = false;
			}}
		/>
	</Modal>
{/if}

<EventTable />
