<script>
	import { createEventDispatcher } from 'svelte';
	import Select from 'svelte-select';
	import DateInput from '../general/DateInput.svelte';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		selectedPeople = event.people || [];
	});

	let startDate = event.startDate;
	let endDate = event.endDate ? event.endDate : '';

	function close() {
		dispatch('close');
	}

	function submit() {
		event.people = selectedPeople;
		event.startDate = startDate;
		event.endDate = endDate;
		dispatch('submit', {
			event
		});
	}

	function handleSelect(event, index) {
		console.log('selected item', event.detail);
		selectedPeople[index] = event.detail.value;
	}
</script>

<h1>{title}</h1>

<div class="item">
	Start Date
	<DateInput bind:date={startDate} />
</div>
<div class="item">
	End Date
	<DateInput bind:date={endDate} />
</div>
{#each event.item.memberTitles as member, i}
	
	<div class="themed-select item">
		{member}
		<Select
			items={peopleToSelectFrom}
			placeholder={'Select..'}
			value={event?.people?.[i]?.name || null}
			on:select={(e) => handleSelect(e, i)}
		/>
	</div>
{/each}

<div class="button-group">
	<button
		class="btn btn-outline btn-error"
		type="button"
		on:click={() => {
			close();
		}}>Close</button
	>
	<button type="button" class="btn btn-outline btn-primary" on:click={submit}>Save</button>
</div>

<style>
.item {
	padding: 0.3em;
}

	.button-group {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 2em 0;
	}

	.themed-select {
		--tw-ring-color: transparent;
		--padding: 1em;
		--border: 0.1em solid #641ae6;
		--borderFocusColor: #641ae6;
		--borderRadius: 10px;
		--background: #2a303c;
		--listBackground: #2a303c;
		--itemIsActiveBG: #641ae6;
		--itemHoverBG: #171a20;
		--height: 50px;
	}
</style>
