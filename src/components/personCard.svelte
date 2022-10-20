<script>
	import { DeleteIcon, SettingsIcon } from 'svelte-feather-icons';
	import { deletePerson } from '../api/people';
	import { createEventDispatcher } from 'svelte';
	import Modal from './general/Modal.svelte';
	import ConfirmAction from './general/ConfirmAction.svelte';

	export let person;

	const dispatch = createEventDispatcher();

	function onDelete() {
		dispatch('onDelete', {
			person
		});
	}

	function onEdit() {
		dispatch('onEdit', {
			person
		});
	}
</script>

<div class="card w-96 bg-base-100 shadow-xl" />
<div class="card-body">
	<h2 class="card-title"><a href={`people/${person._id}`}>{person.name}</a></h2>
	<span on:click={onDelete}><DeleteIcon /> </span>
	<span on:click={onEdit}><SettingsIcon /> </span>
</div>
<div class="card w-96 bg-base-100 shadow-xl" />
