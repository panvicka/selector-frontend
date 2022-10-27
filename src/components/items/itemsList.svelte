<script lang="typescript">
	import ItemCard from './itemCard.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { onMount } from 'svelte';
	import { getAllItems } from '../../api/item';
	import Modal from '../general/Modal.svelte';
	import ItemForm from '../forms/ItemForm.svelte';
	import ConfirmAction from '../general/ConfirmAction.svelte';
	import { handleCreateNew, handleDeleteItem, handleEditItem } from './itemHandlerFunctions';

	let items = [];
	let workingItemReference = {};

	onMount(async () => {
		await fetch();
	});

	const fetch = async () => {
		items = await getAllItems();
	};

	let showCreateItemModal = false;
	let showDeleteItemModal = false;
	let showEditItemModal = false;
</script>

<svelte:head>
	<title>Index page</title>
</svelte:head>

<div class="grid grid-cols-1 md:grid-cols-2 gap-9">
	{#each items as item}
		<div>
			<ItemCard
				{item}
				on:onDelete={(event) => {
					workingItemReference = event.detail.item;
					showDeleteItemModal = true;
				}}
				on:onEdit={(event) => {
					showEditItemModal = true;
					workingItemReference = event.detail.item;
				}}
			/>
		</div>
	{/each}
</div>

<span
	on:click={(e) => {
		showCreateItemModal = true;
	}}
	><PlusCircleIcon />
</span>

{#if showCreateItemModal}
	<Modal>
		<ItemForm
			title={'create new item'}
			on:submit={(event) => {
				handleCreateNew(event, fetch);
				showCreateItemModal = false;
			}}
			on:close={() => {
				showCreateItemModal = false;
			}}
		/>
	</Modal>
{/if}

{#if showDeleteItemModal}
	<Modal>
		<ConfirmAction
			on:cancel={() => {
				showDeleteItemModal = false;
			}}
			on:ok={() => {
				handleDeleteItem(workingItemReference._id, fetch);
				showDeleteItemModal = false;
			}}
		>
			<svelte:fragment slot="title">Confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete {workingItemReference.name}? You can not reverse this action.
			</span>
		</ConfirmAction>
	</Modal>
{/if}

{#if showEditItemModal}
	<Modal>
		<ItemForm
			title={'edit Item'}
			item={workingItemReference}
			on:submit={(event) => {
				handleEditItem(event, workingItemReference._id, fetch);
				showEditItemModal = false;
			}}
			on:close={() => {
				showEditItemModal = false;
			}}
		/>
	</Modal>
{/if}


 