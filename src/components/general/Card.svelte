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

<div>
	<div class="card w-96 bg-base-100 shadow-xl" />
	<div class="card-body">
		<h2 class="card-title"><slot name="title" /></h2>
		<span on:click={deleteTrigger}><DeleteIcon /> </span>
		<span on:click={settingsTrigger}><SettingsIcon /> </span>

		<slot name="content" />
	</div>
	<div class="card w-96 bg-base-100 shadow-xl" />
</div>
