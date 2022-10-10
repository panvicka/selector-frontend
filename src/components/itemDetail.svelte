<script>
	import { SettingsIcon } from 'svelte-feather-icons';

	import { getItemById, updateItem } from '../api/item';
	import TextField from './general/textField.svelte';

	export let item;
	let name = item.name;
	let members = item.memberTitles.toString();

	const update = async (e) => {
		e.preventDefault();
		const membersArray = members.split(',');
		const res = await updateItem(item._id, { name, memberTitles: membersArray });
		fetch();
	};

	const fetch = async (id) => {
		const res = await getItemById(item._id);
		item = res;
	};
</script>

<!-- <p>{item._id}</p> -->

<div class="grid place-items-center prose-base">
	<h1>{item.name}</h1>

	<ul>
		{#each item.memberTitles as member}
			<p>{member}</p>
		{/each}
	</ul>

	<div class="collapse">
		<input type="checkbox" />
		<div class="collapse-title text-xl font-medium">
			<SettingsIcon size="1.5x" />
		</div>
		<div class="collapse-content">
			<div class="form-control w-full max-w-xs">
				<TextField inputLabel={'Name'} inputPlaceholder="Name of the item" bind:textValue={name} />
				<TextField
					inputLabel={'Members'}
					inputPlaceholder="Member titles (comma separated)"
					bind:textValue={members}
				/>
				<button class="btn btn-accent" on:click={update}>Save</button>
			</div>
		</div>
	</div>
</div>
