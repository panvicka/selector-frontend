<script>
	import { createPerson, deletePerson, getAllPeople } from '../../api/people';
	import { onMount } from 'svelte';
	import PersonCard from '../../components/personCard.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import { getAllItems } from '../../api/item';
	import Modal from '../../components/general/Modal.svelte';
	import PersonForm from '../../components/forms/personForm.svelte';

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

	const handleDeletePerson = async (event) => {
		const res = await deletePerson(event.detail.personId);
		console.log(res);
		fetchAllPeople();
	};

	let letShowCreateModal = false;
</script>

<div class="grid grid-cols-4">
	{#each people as person}
		<div>
			<PersonCard {person} on:onDelete={handleDeletePerson} />
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
