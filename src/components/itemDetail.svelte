<script>
	import { getAllPeople } from '../api/people';
	import { SettingsIcon } from 'svelte-feather-icons';

	import { getItemById, updateItem } from '../api/item';
	import EventCreator from './eventCreator.svelte';
	import EventTable from './eventTable.svelte';
	import EventForm from './forms/eventForm.svelte';
	import ItemForm from './forms/ItemForm.svelte';
	import Modal from './general/Modal.svelte';
	import { onMount } from 'svelte';
	import { createEvent } from '../api/event';

	let createNewEventModalOpened = false;

	export let item;

	onMount(async () => {
		getAllSelectablePeople();
	});

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

	const handleCreateNewEvent = async (event) => {
		console.log(event);
		const payload = {
			item: event.detail.event.item._id,
			people: event.detail.event.people,
			startDate: event.detail.event.startDate,
			endDate: event.detail.event.endDate
		};
		console.log(payload);
		console.log('creating event');
		const res = await createEvent(payload);
		console.log(res);

		fetch();
	};

	let selectablePeople = [];
	const getAllSelectablePeople = async () => {
		const res = await getAllPeople();
		selectablePeople = res.map((person) => {
			return {
				value: person._id,
				label: person.name
			};
		});
	};
</script>

<div class="grid place-items-center prose">
	<h1>{item.name}</h1>

	<ul>
		{#each item.memberTitles as member}
			<p>{member}</p>
		{/each}
	</ul>
</div>

<span
	on:click={() => {
		letShowEditModal = true;
	}}
	><SettingsIcon />
</span>

<button
	on:click={() => {
		createNewEventModalOpened = true;
	}}>add new event</button
>
{#if createNewEventModalOpened}
	<Modal>
		<EventForm
			title={'Create new event'}
			peopleToSelectFrom={selectablePeople}
			event={{ item }}
			on:close={() => {
				createNewEventModalOpened = false;
			}}
			on:submit={(event) => {
				handleCreateNewEvent(event);
				createNewEventModalOpened = false;
			}}
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
