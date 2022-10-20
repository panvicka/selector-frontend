<script>
	import { getAllItems } from './../api/item';
	import { onMount } from 'svelte';
	import { updatePerson } from './../api/people';

	export let person;
</script>

{person.name}

<style>
	.form-control {
		width: 300px;
	}
</style>
