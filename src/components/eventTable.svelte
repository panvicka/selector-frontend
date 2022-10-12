<script>
	import Grid from 'gridjs-svelte';
	import 'gridjs/dist/theme/mermaid.css';
	import { getAllEvents } from '../api/event';
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

	const fetch = async () => {
		const res = await getAllEvents();

		events = res;
		console.log(events);
		data = events.map((event) => {
			let people = {};
			console.log(event);
			event?.item?.memberTitles.forEach((title, index) => {
				people[title] = event.people?.[index]?.name || '';
			});
			console.log(people);
			return {
				startDate: new Date(event.startDate).toLocaleString().split(',')[0],
				endDate: event.endDate ? new Date(event.endDate).toLocaleString().split(',')[0] : '',
				...people
			};
		});
		columns = ['startDate', 'endDate', ...events[0].item.memberTitles];

		// grid
		// 	.updateConfig({
		// 		data
		// 	})
		// 	.forceRender();
		// console.log(data);
	};
</script>

<Grid {data} {columns} sort={true} />

<style global>
	/* @import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css'; */
</style>
