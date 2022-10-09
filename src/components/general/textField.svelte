<script>
	export let textValue;

	let label;
	let placeholder;
</script>

<label class="label" for={`${label}-ID`}>
	<span class="label-text">Name</span>
</label>
<input
	bind:value={textValue}
	type="text"
	id={`${label}-ID`}
	placeholder={placeholder || 'Type here'}
	class="input input-bordered w-full max-w-xs"
/>
