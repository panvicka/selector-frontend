<script>
	import { DeleteIcon, SettingsIcon } from 'svelte-feather-icons';
 
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function deleteTrigger() {
		dispatch('deleteTrigger');
	}

	function settingsTrigger() {
		dispatch('settingsTrigger');
	}
</script>

<div class="card w-96 bg-neutral shadow-xl">
	<div class="card-body">
		<div class="card-actions justify-end">
			<button id="delete" on:click={deleteTrigger}><DeleteIcon/> </button>
			<button id="edit" on:click={settingsTrigger}><SettingsIcon /> </button>
		</div>
		<h2 class="card-title"><slot name="title" /></h2>

		<slot name="content" />
	</div>
</div>

<style>
	.card {
		min-height: 300px;
 	}

	 button {
		 margin: 1em 0;
	 }
	 
	 #delete {
		 
	 }

 
</style>
