<script>
	import TextField from '../general/textField.svelte';
	import { createEventDispatcher } from 'svelte';
	import Select from 'svelte-select';
	import DateInput from '../general/DateInput.svelte';
	const dispatch = createEventDispatcher();

	export let peopleToSelectFrom = [];
	export let title = '';

	let selectedPeople = [];

	export let event = {
		item: {
			_id: '',
			memberTitles: []
		},
		startDate: '',
		endDate: '',
		people: []
	};

	let startDate = event.startDate;
	let endDate = event.endDate ? event.endDate : '';

	console.log('passed event');
	console.log(event);

	function close() {
		dispatch('close');
	}

	function submit() {
		event.people = selectedPeople;
		console.log('submitting');
		event.startDate = startDate;
		event.endDate = endDate;
		console.log(event);
		dispatch('submit', {
			event
		});
	}

	function handleSelect(event, index) {
		console.log('selected item', event.detail);
		selectedPeople[index] = event.detail.value;
		console.log(selectedPeople);
	}
</script>

<h1>{title}</h1>

Start Date
<DateInput bind:date={startDate} />
End Date
<DateInput bind:date={endDate} />

{#each event.item.memberTitles as member, i}
	{member}
	<Select
		items={peopleToSelectFrom}
		placeholder={'Select..'}
		value={event?.people?.[i]?.name || null}
		on:select={(e) => handleSelect(e, i)}
	/>
{/each}

<div>
	<button
		class="btn btn-outline btn-error"
		type="button"
		on:click={() => {
			close();
		}}>Close</button
	>
	<button type="button" class="btn btn-outline btn-info" on:click={submit}>Save</button>
</div>
