<script>
	import { SettingsIcon } from 'svelte-feather-icons';

	export let item;

	let name = item.name;

	let result = null;

	function formHandler(event) {
		event.preventDefault();

		fetch(`http://localhost:9090/rotationItems/update/${item._id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
			})
		})
			.then((response) => response.json())
			.then((result) => console.log(result));
	}

</script>

<p>{item._id}</p>
<p>{item.name}</p>
<p>{item.memberTitles[0]}</p>
<p>{item.memberTitles[1]}</p>

<div class="collapse">
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		<SettingsIcon size="1.5x" />
	</div>
	<div class="collapse-content">
		<div class="form-control w-full max-w-xs">
			<label class="label">
				<span class="label-text">Name</span>
			</label>
			<input
				bind:value={name}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			<button class="btn btn-accent" on:click={formHandler}>Save</button>
		</div>
	</div>
</div>
