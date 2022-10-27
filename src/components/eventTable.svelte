<script>
	// @ts-nocheck

	import Grid from 'gridjs-svelte';
	import { h } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let eventsToShow = [];
	let mappedTableData = [];
	let columns = ['startDate', 'endDate'];

	let mapData = (events) => {
		return events.map((event) => {
			let people = {};
			event?.item?.memberTitles.forEach((title, index) => {
				people[title] = event.people?.[index]?.name || '';
			});
			return {
				startDate: new Date(event.startDate).toLocaleString().split(',')[0],
				endDate: event.endDate ? new Date(event.endDate).toLocaleString().split(',')[0] : '',
				id: event._id,
				...people
			};
		});
	};

	let mapColumns = (events) => {
		return [
			{
				name: 'id',
				hidden: true
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
								submitEdit(row.cells[0].data);
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
								submitDelete(row.cells[0].data);
							}
						},
						'Delete'
					);
				}
			}
		];
	};

	let grid;

	$: {
		if (grid) {
			mappedTableData = mapData(eventsToShow);
			columns = mapColumns(eventsToShow);
			grid.updateConfig({ data: mappedTableData, columns: columns }).forceRender();
		}
	}

	function submitEdit(eventId) {
		dispatch('submitEdit', {
			eventId
		});
	}

	function submitDelete(eventId) {
		dispatch('submitDelete', {
			eventId
		});
	}
	const className = {
		container: 'event-table'
	};
</script>

<Grid bind:instance={grid} data={mappedTableData} {columns} sort={true} {className} />

<style global>
	/* @import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css'; */

	.event-table tr:hover td {
		background: hsl(var(--nf));
	}

	.event-table td {
		background: hsl(var(--n));
		color: hsl(var(--bc));
		border-color: hsl(var(--p));
	}

	.event-table th {
		background: hsl(var(--n));
		color: hsl(var(--p)) !important;
	}

	.gridjs-table {
		border: none !important;
		width: 100%;
	}
	.gridjs-wrapper {
		border: none;
		/* width: 80%; */
		/* max-width: 900px; */
		margin: 0 auto;
	}
</style>
