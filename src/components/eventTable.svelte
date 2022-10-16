<script>
	// @ts-nocheck

	import Grid from 'gridjs-svelte';
	import { h, PluginPosition } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';
	import { deleteEvent, getAllEvents } from '../api/event';
	import { onMount } from 'svelte';

	let data = [];

	// data = [
	// 	{ name: 'John', email: 'john@example.com' },
	// 	{ name: 'Mark', email: 'mark@gmail.com' }
	// ];

	let columns = ['startDate', 'endDate'];

	console.log('alive');
	console.log(data);

	let events = [];
	let grid;

	onMount(async () => {
		await fetch();
	});

	const handleDeleteEvent = async (eventId) => {
		console.log(eventId);
		const res = await deleteEvent(eventId);
		console.log(res);
		forceRerender();
	};

	const forceRerender = async () => {
		const res = await getAllEvents();
		events = res;

		data = events.map((event) => {
			let people = {};
			event?.item?.memberTitles.forEach((title, index) => {
				people[title] = event.people?.[index]?.name || '';
			});
			console.log(people);
			console.log(event);
			console.log(event.endDate ? new Date(event.endDate).toLocaleString().split(',')[0] : '');
			return {
				startDate: new Date(event.startDate).toLocaleString().split(',')[0],
				endDate: event.endDate ? new Date(event.endDate).toLocaleString().split(',')[0] : '',
				id: event._id,
				...people
			};
		});
		grid.updateConfig({ data }).forceRender();
	};

	const fetch = async () => {
		const res = await getAllEvents();

		events = res;
		console.log(events);
		data = events.map((event) => {
			let people = {};
			event?.item?.memberTitles.forEach((title, index) => {
				people[title] = event.people?.[index]?.name || '';
			});
			console.log(people);
			console.log(event);
			console.log(event.endDate ? new Date(event.endDate).toLocaleString().split(',')[0] : '');
			return {
				startDate: new Date(event.startDate).toLocaleString().split(',')[0],
				endDate: event.endDate ? new Date(event.endDate).toLocaleString().split(',')[0] : '',
				id: event._id,
				...people
			};
		});
		// columns = ['startDate', 'endDate', ...events[5].item.memberTitles];
		columns = [
			{
				name: 'id',
				hidden: false
			},
			'startDate',
			'endDate',
			...events[0].item.memberTitles,
			{
				name: 'Edit',
				formatter: (cell, row) => {
					return h(
						'button',
						{
							onClick: () => {
								alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`);
							}
						},
						'Edit'
					);
				}
			},
			{
				name: 'Delete',
				formatter: (cell, row) => {
					return h(
						'button',
						{
							onClick: () => {
								handleDeleteEvent(row.cells[0].data);
								// alert(`Delete "${row.cells[0].data}" "${row.cells[1].data}"`);
							}
						},
						'Delete'
					);
				}
			}
		];

		// grid
		// 	.updateConfig({
		// 		data
		// 	})
		// 	.forceRender();
		// console.log(data);
	};
</script>

<Grid bind:instance={grid} {data} {columns} sort={true} />

<style global>
	/* @import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css'; */
</style>
