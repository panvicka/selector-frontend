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
	import { createEvent, deleteEvent, getAllEvents, getAllEventsForItem, getEventById, updateEvent } from '../api/event';

	export let item;

	let newEventModalOpened = false;
	let editItemModalOpened = false;
	let editEventModalOpened = false;

	onMount(async () => {
		getAllSelectablePeople();
		fetchAllItemEvents();
	});

	const fetchItem = async () => {
		item = await getItemById(item._id);
	};

	let itemEvents = [];

	const fetchAllItemEvents = async () => {
		itemEvents = await getAllEventsForItem(item._id);
	};

	const handleUpdateItem = async (event) => {
		const res = await updateItem(item._id, event.detail.item);
		fetchItem();
		editItemModalOpened = false;
	};

	const handleCreateNewEvent = async (event) => {
		const payload = {
			item: event.detail.event.item._id,
			people: event.detail.event.people,
			startDate: event.detail.event.startDate,
			endDate: event.detail.event.endDate
		};

		const res = await createEvent(payload);

		fetchAllItemEvents();
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

	let eventToEdit;
	const triggerEventEdit = async (event) => {
		const res = await getEventById(event.detail.eventId);
		eventToEdit = res;
		editEventModalOpened = true;
	};

	const triggerEventDelete = async (event) => {
		const res = await deleteEvent(event.detail.eventId);
		fetchAllItemEvents();
	};

	const handleUpdateEvent = async (event) => {
		const res = await updateEvent(event.detail.event._id, {
			item: event.detail.event.item._id,
			people: event.detail.event.people,
			startDate: event.detail.event.startDate,
			endDate: event.detail.event.endDate
		});
		editItemModalOpened = false;
		fetchAllItemEvents();
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
		editItemModalOpened = true;
	}}
	><SettingsIcon />
</span>

<button
	on:click={() => {
		newEventModalOpened = true;
	}}>add new event</button
>
{#if newEventModalOpened}
	<Modal>
		<EventForm
			title={'Create new event'}
			peopleToSelectFrom={selectablePeople}
			event={{ item }}
			on:close={() => {
				newEventModalOpened = false;
			}}
			on:submit={(event) => {
				handleCreateNewEvent(event);
				newEventModalOpened = false;
			}}
		/>
	</Modal>
{/if}

{#if editItemModalOpened}
	<Modal>
		<ItemForm
			title={'edit item'}
			{item}
			on:submit={handleUpdateItem}
			on:close={() => {
				editItemModalOpened = false;
			}}
		/>
	</Modal>
{/if}

{#if editEventModalOpened}
	<Modal>
		<EventForm
			title={'Edit event'}
			peopleToSelectFrom={selectablePeople}
			event={eventToEdit}
			on:close={() => {
				editEventModalOpened = false;
			}}
			on:submit={(event) => {
				handleUpdateEvent(event);
				editEventModalOpened = false;
			}}
		/>
	</Modal>
{/if}

{#if itemEvents.length > 0}
	<EventTable
		on:submitEdit={triggerEventEdit}
		on:submitDelete={triggerEventDelete}
		eventsToShow={itemEvents}
	/>
{/if}
