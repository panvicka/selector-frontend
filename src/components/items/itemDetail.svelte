<script>
	import { getAllPeople, getAllPeopleByItem } from '../../api/people';
	import { SettingsIcon } from 'svelte-feather-icons';

	import { getItemById, updateItem } from '../../api/item';
	import EventTable from '../eventTable.svelte';
	import EventForm from '../forms/eventForm.svelte';
	import ItemForm from '../forms/ItemForm.svelte';
	import Modal from '../general/Modal.svelte';
	import { onMount } from 'svelte';
	import {
		createEvent,
		deleteEvent,
		getAllEvents,
		getAllEventsForItem,
		getEventById,
		updateEvent
	} from '../../api/event';
	import PeopleTable from '../people/peopleTable.svelte';

	export let item;

	let newEventModalOpened = false;
	let editItemModalOpened = false;
	let editEventModalOpened = false;

	let selectablePeople = [];
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

	
	const getAllSelectablePeople = async () => {
		console.log(item._id);
		const res = await getAllPeopleByItem(item._id);
		selectablePeople = res.map((person) => {
			return {
				value: person._id,
				label: person.name
			};
		});
		console.log("selectrable people")
		console.log(selectablePeople);
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

{#if selectablePeople.length > 0}
	<PeopleTable />
{/if}
