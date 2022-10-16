<script>
	import TextField from '../general/textField.svelte';
	import { createEventDispatcher } from 'svelte';
	import Select from 'svelte-select';
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

	function close() {
		dispatch('close');
	}

	function submit() {
		event.people = selectedPeople;
		console.log('submitting');
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

Start Date<input
	type="date"
	class="input input-bordered input-primary w-full max-w-xs"
	bind:value={event.startDate}
/><br />
End Date
<input
	type="date"
	class="input input-bordered input-primary w-full max-w-xs"
	bind:value={event.endDate}
/><br />

{#each event.item.memberTitles as member, i}
	{member}
	<Select
		items={peopleToSelectFrom}
		placeholder={'Select..'}
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
