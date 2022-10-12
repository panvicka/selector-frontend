<script>
	import TextField from './general/textField.svelte';
	import { Button, Dropdown, DropdownItem, Chevron, Checkbox, Search } from 'flowbite-svelte';
	import Select from 'svelte-select';
	import { onMount } from 'svelte';
	import { getAllPeople } from '../api/people';
	import { createEvent } from '../api/event';
	let startDate = new Date();
	let endDate = new Date();

	onMount(async () => {
		await fetch();
	});

	const fetch = async () => {
		console.log('runnign');
		const res = await getAllPeople();
		people = res.map((person) => {
			return {
				value: person._id,
				label: person.name
			};
		});
		console.log(people);
	};

	export let membersTitles = ['main', 'support'];
	export let itemId;
	let selected;
	let value = null;
	let people = [];
	let selectedPeople = [];

	function handleSelect(event, index) {
		console.log('selected item', event.detail);
		selectedPeople[index] = event.detail.value;
		console.log(selectedPeople);
	}

	const createEventHandler = async () => {
		console.log('create event');
		const payload = {
			item: itemId,
			people: selectedPeople,
			startDate: startDate,
			endDate: endDate
		};
		console.log(payload);

		const res = await createEvent(payload);
	};
</script>

<div class="form-control w-full max-w-xs">
	Start Date <input type="date" bind:value={startDate} />
	End Date <input type="date" bind:value={endDate} />

	{#each membersTitles as member, i}
		{member}
		<Select items={people} {value} placeholder={'Select..'} on:select={(e) => handleSelect(e, i)} />
	{/each}

	<button class="btn btn-accent" on:click={createEventHandler}>Create Event</button>
</div>
