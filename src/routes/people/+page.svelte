<script>
	import { getAllPeople } from '../../api/people';
	import { onMount } from 'svelte';
	import PersonCard from '../../components/personCard.svelte';

	let people = [];

	onMount(async () => {
		await fetch();
	});

	const fetch = async () => {
		const res = await getAllPeople();
		people = res;
	};
</script>

<svelte:head>
	<title>People</title>
</svelte:head>

<h1>People</h1>

<ul>
	{#each people as person}
		<PersonCard {person} />
	{/each}
</ul>
