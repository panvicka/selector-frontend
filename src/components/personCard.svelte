<script>
	import { DeleteIcon } from 'svelte-feather-icons';
	import { deletePerson } from '../api/people';
	import { createEventDispatcher } from 'svelte';

	export let person;

	const dispatch = createEventDispatcher();

	function onDelete() {
		dispatch('onDelete', {
			personId: person._id
		});
	}
</script>

<div class="card w-96 bg-base-100 shadow-xl" />
<div class="card-body">
	<h2 class="card-title"><a href={`people/${person._id}`}>{person.name}</a></h2>
	<span on:click={onDelete}><DeleteIcon /> </span>
</div>
<div class="card w-96 bg-base-100 shadow-xl" />
