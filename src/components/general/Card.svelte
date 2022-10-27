<script>
	import { DeleteIcon, SettingsIcon } from 'svelte-feather-icons';

	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import { faGear } from '@fortawesome/free-solid-svg-icons';

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
			<button on:click={settingsTrigger}><Fa size="lg" id="setting" icon={faGear} /></button>
			<button on:click={deleteTrigger}><Fa size="lg" id="delete" icon={faTrash} /></button>
		</div>
		<h2 class="text-accent hover:text-accent-focus card-title"><slot name="title" /></h2>

		<slot name="content" />
	</div>
</div>

<style>
	.card {
		min-height: 300px;
	}

	:global(svg) {
		transition: color 0.4s ease-out 100ms;
	}

	:global(#delete:hover) {
		color: hsl(var(--er));
	}

	:global(#setting:hover) {
		color: hsl(var(--in));
	}
</style>
