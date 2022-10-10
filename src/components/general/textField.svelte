<script>
	export let inputLabel;
	export let inputPlaceholder;
	export let textValue;
</script>

<label class="label" for={`${inputLabel}-ID`}>
	<span class="label-text">{inputLabel}</span>
</label>
<input
	bind:value={textValue}
	type="text"
	id={`${inputLabel}-ID`}
	placeholder={inputPlaceholder || 'Type here'}
	class="input input-bordered w-full max-w-xs"
/>
