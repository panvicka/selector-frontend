<script>
	import { DeleteIcon } from 'svelte-feather-icons';
	import { deleteItem } from '../api/item';
    import { createEventDispatcher } from 'svelte';

	export let item;

    const dispatch = createEventDispatcher();

	const deleteHandler = async () => {
		console.log('deleting');
		const res = await deleteItem(item._id);
        dispatch('item-deleted');
	};
</script>

<div class="card w-96 bg-base-100 shadow-xl" />
<div class="card-body">
	<h2 class="card-title"><a href={`items/${item._id}`}>{item.name}</a></h2>
	<span on:click={deleteHandler}><DeleteIcon /> </span>
	<ul>
		{#each item.memberTitles as memberTitle}
			<li>{memberTitle}</li>
		{/each}
	</ul>
</div>
<div class="card w-96 bg-base-100 shadow-xl" />
