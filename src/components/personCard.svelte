<script>
	import { createEventDispatcher } from 'svelte';
	import Card from './general/Card.svelte';

	const dispatch = createEventDispatcher();

	export let person;
</script>

<Card
	on:deleteTrigger={() => {
		dispatch('onDelete', {
			person
		});
	}}
	on:settingsTrigger={() => {
		dispatch('onEdit', {
			person
		});
	}}
>
	<a slot="title" href={`people/${person._id}`}>{person.name}</a>
</Card>
