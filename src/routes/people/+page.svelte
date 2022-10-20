<script>
	import { createPerson, deletePerson, getAllPeople, updatePerson } from '../../api/people';
	import { onMount } from 'svelte';
	import PersonCard from '../../components/personCard.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { getAllItems } from '../../api/item';
	import Modal from '../../components/general/Modal.svelte';
	import PersonForm from '../../components/forms/personForm.svelte';
	import ConfirmAction from '../../components/general/ConfirmAction.svelte';

	let people = [];

	let allItems = [];
	let itemCheckStates = [];

	onMount(async () => {
		await fetchAllPeople();
		allItems = await getAllItems();
	});

	const fetchAllPeople = async () => {
		const res = await getAllPeople();
		people = res;
	};

	const handleCreateNewPerson = async (event) => {
		console.log(event.detail);
		const res = await createPerson({
			name: event.detail.name,
			itemsCanBeAttended: event.detail.itemsCanBeAttended
		});
		console.log(res);
		letShowCreateModal = false;
		fetchAllPeople();
	};

	const handleDeletePerson = async (personId) => {
		const res = await deletePerson(personId);
		console.log(res);
		fetchAllPeople();
		showDeleteModal = false;
	};

	const handleEditPerson = async (event) => {
		console.log('data send to edit');
		console.log(event.detail);
		const res = await updatePerson(personToBeEdited._id, event.detail);
		console.log(res);
		fetchAllPeople();
		letShowEditModal = false;
	};

	const triggeredDeletePerson = (event) => {
		console.log('triggered to be deleted');
		personToBeDeleted = event.detail.person;
		console.log(personToBeDeleted);
		showDeleteModal = true;
	};

	let personToBeDeleted = {};
	let personToBeEdited = {};

	let showDeleteModal = false;
	let letShowCreateModal = false;
	let letShowEditModal = false;
</script>

{#if showDeleteModal}
	<Modal>
		<ConfirmAction
			on:cancel={() => {
				showDeleteModal = false;
			}}
			on:ok={() => {
				handleDeletePerson(personToBeDeleted._id);
			}}
		>
			<svelte:fragment slot="title">Confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete {personToBeDeleted.name}? You can not reverse this action.
			</span>
		</ConfirmAction>
	</Modal>
{/if}

<div class="grid grid-cols-4">
	{#each people as person}
		<div>
			<PersonCard
				{person}
				on:onDelete={triggeredDeletePerson}
				on:onEdit={(event) => {
					letShowEditModal = true;
					personToBeEdited = event.detail.person;
					console.log('to be edited');
					console.log(personToBeEdited);
				}}
			/>
		</div>
	{/each}
</div>

<h1>People</h1>

<span
	on:click={(e) => {
		letShowCreateModal = true;
	}}
	><PlusCircleIcon />
</span>

{#if letShowCreateModal}
	<Modal>
		<PersonForm
			title={'create new person'}
			{allItems}
			on:submit={handleCreateNewPerson}
			on:close={() => {
				letShowCreateModal = false;
			}}
		/>
	</Modal>
{/if}

{#if letShowEditModal}
	<Modal>
		<PersonForm
			title={'edit person'}
			person={personToBeEdited}
			{allItems}
			on:submit={handleEditPerson}
			on:close={() => {
				letShowEditModal = false;
			}}
		/>
	</Modal>
{/if}
