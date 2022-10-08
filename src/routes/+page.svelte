<script lang="typescript">
	import { items } from '../store/itemsStore';
	import ItemCard from '../components/itemCard.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';

	let name = '';
	let members = '';
</script>

<svelte:head>
	<title>Index page</title>
</svelte:head>

<div class="wrapper">
	{#each $items as item}
		<ItemCard {item} />
	{/each}
</div>

<div class="collapse">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		<PlusCircleIcon />
	</div>
	<div class="collapse-content">
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">Name</span>
			</label>
			<input
				bind:value={name}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>

			<label class="label">
				<span class="label-text">Members</span>
			</label>
			<input
				bind:value={members}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			<button class="btn btn-accent" on:click={formHandler}>Add item</button>
		</div>
	</div>
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
