<script>
	import { createEventDispatcher } from 'svelte';
	import Card from '../general/Card.svelte';

	export let item;

	const dispatch = createEventDispatcher();
</script>

<Card
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

	<ul slot="content">
		{#each item.memberTitles as memberTitle}
			<li>{memberTitle}</li>
		{/each}
	</ul>
</Card>
