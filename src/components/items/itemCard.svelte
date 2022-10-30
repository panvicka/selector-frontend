<script>
// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	import Card from '../general/Card.svelte';

	export let item;

	const dispatch = createEventDispatcher();
</script>

<Card width={400} height={200}
	on:deleteTrigger={() => {
		dispatch('onDelete', {
			item
		});
	}}
	on:settingsTrigger={() => {
		dispatch('onEdit', {
			item
		});
	}}
>
	<a slot="title" href={`items/${item._id}`}>{item.name}</a>

	<div slot="content">
		{#each item.memberTitles as memberTitle}
			<div class="badge badge-ghost">{memberTitle}</div>
		{/each}
	</div>
</Card>

<style> 
.badge {
	margin: 0 1em 0 0;
}
</style>