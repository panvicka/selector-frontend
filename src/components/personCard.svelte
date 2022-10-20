<script>
	import { DeleteIcon } from 'svelte-feather-icons';
	import { deletePerson } from '../api/people';
	import { createEventDispatcher } from 'svelte';
	import Modal from './general/Modal.svelte';
	import ConfirmAction from './general/ConfirmAction.svelte';

	export let person;

	const dispatch = createEventDispatcher();

	let deleteTriggered = false;
</script>

{#if deleteTriggered}
	<Modal>
		<ConfirmAction
			on:cancel={() => {
				deleteTriggered = false;
			}}
			on:ok={() => {
				dispatch('onDelete', {
					personId: person._id
				});
				deleteTriggered = false;
			}}
		>
			<svelte:fragment slot="title">Confirmation</svelte:fragment>
			<span slot="content"
				>Do you really want to delete {person.name}? You can not reverse this action.
			</span>
		</ConfirmAction>
	</Modal>
{/if}

<div class="card w-96 bg-base-100 shadow-xl" />
<div class="card-body">
	<h2 class="card-title"><a href={`people/${person._id}`}>{person.name}</a></h2>
	<span
		on:click={() => {
			deleteTriggered = true;
		}}
		><DeleteIcon />
	</span>
</div>
<div class="card w-96 bg-base-100 shadow-xl" />
