<svelte:head>
    <title>People</title>
</svelte:head>

<script> 
export let data;
console.log(data.persons)
</script>

<h1>People</h1>

<ul>
	{#each data.persons as person}
		<li>{person.name}</li>
	{/each}
</ul>
