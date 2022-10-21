<script>
	import EventTable from '../eventTable.svelte';
	import EventForm from '../forms/eventForm.svelte';
	import Modal from '../general/Modal.svelte';
	import { onMount } from 'svelte';
	import { getAllEventsForItem, getEventById } from '../../api/event';
	import PeopleTable from '../people/peopleTable.svelte';
	import { getAllSelectablePeople } from '../people/peopleHandlerFunctions';
	import {
		handleCreateNewEvent,
		handleUpdateEvent,
		handleDeleteEvent
	} from '../events/eventHandlerFuntions';
	import ConfirmAction from '../general/ConfirmAction.svelte';

	export let item;

	let itemEvents = [];
	let selectablePeople = [];
	let workingEventReference;

	let showCreateEventModalOpened = false;
	let showEditModalOpened = false;
	let showDeleteEventModal = false;

	onMount(async () => {
		selectablePeople = await getAllSelectablePeople(item._id);
		fetchAllItemEvents();
	});

	const fetchAllItemEvents = async () => {
		itemEvents = await getAllEventsForItem(item._id);
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
		showCreateEventModalOpened = true;
	}}>add new event</button
>
{#if showCreateEventModalOpened}
	<Modal>
		<EventForm
			title={'Create new event'}
			peopleToSelectFrom={selectablePeople}
			event={{ item }}
			on:close={() => {
				showCreateEventModalOpened = false;
			}}
			on:submit={(event) => {
				handleCreateNewEvent(event.detail.event, fetchAllItemEvents);
				showCreateEventModalOpened = false;
			}}
		/>
	</Modal>
{/if}

{#if showEditModalOpened}
	<Modal>
		<EventForm
			title={'Edit event'}
			peopleToSelectFrom={selectablePeople}
			event={workingEventReference}
			on:close={() => {
				showEditModalOpened = false;
			}}
			on:submit={(event) => {
				handleUpdateEvent(event.detail.event, fetchAllItemEvents);
				showEditModalOpened = false;
			}}
		/>
	</Modal>
{/if}

{#if showDeleteEventModal}
	<Modal>
		<ConfirmAction
			on:cancel={() => {
				showDeleteEventModal = false;
			}}
			on:ok={() => {
				handleDeleteEvent(workingEventReference, fetchAllItemEvents);
				showDeleteEventModal = false;
			}}
		>
			<svelte:fragment slot="title">Delete confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete this event? You can not reverse this action.
			</span>
		</ConfirmAction>
	</Modal>
{/if}

{#if itemEvents.length > 0}
	<EventTable
		on:submitEdit={async (event) => {
			workingEventReference = await getEventById(event.detail.eventId);
			showEditModalOpened = true;
		}}
		on:submitDelete={async (event) => {
			workingEventReference = await getEventById(event.detail.eventId);
			showDeleteEventModal = true;
		}}
		eventsToShow={itemEvents}
	/>
{/if}

{#if selectablePeople.length > 0}
	<PeopleTable />
{/if}
