<script lang="typescript">
	import { items } from '../store/itemsStore';
	import ItemCard from '../components/itemCard.svelte';

	const handleOnClick = async () => console.log('click');
</script>

<svelte:head>
	<title>Index page</title>
</svelte:head>

<div class="wrapper">
	<button on:click={handleOnClick}>Get</button>
	{#each $items as item}
		<ItemCard {item} />
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	p {
		max-width: 500px;
		text-align: center;
	}
</style>
