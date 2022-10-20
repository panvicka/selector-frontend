<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function cancel() {
		dispatch('cancel');
	}

	function ok() {
		dispatch('ok');
	}
</script>

<div>
	<div>
		<h1><slot name="title" /></h1>
		<slot name="content" />
	</div>
	<button
		class="btn btn-outline btn-error"
		type="button"
		on:click={() => {
			cancel();
		}}>Cancel</button
	>
	<button type="button" class="btn btn-outline btn-info" on:click={ok}>Ok</button>
</div>
