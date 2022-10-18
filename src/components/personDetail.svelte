<script>
	import { getAllItems } from './../api/item';
	import { onMount } from 'svelte';
 	import { updatePerson } from './../api/people';

	let allItems = [];
	let itemCheckStates = [];
	export let person;
	console.log(person);

	onMount(async () => {
		allItems = await getAllItems();
		itemCheckStates = allItems.map((item) => {
			let itemSummary = {
				_id: item._id,
				name: item.name,
				checked: false
			};
			if (person.itemsCanBeAttended.includes(item._id)) {
				itemSummary.checked = true;
			}

			return itemSummary;
		});
		console.log(itemCheckStates);
	});

	const setItemsToUser = () => {
		console.log(itemCheckStates);
		let itemArray = [];
		itemCheckStates.forEach((item) => {
			if (item.checked) {
				itemArray.push(item._id);
			}
		});
		console.log(itemArray);
		const res = updatePerson(person._id, { name: person.name, itemsCanBeAttended: itemArray });
	};
</script>

{person.name}
<div class="form-control">
	{#each itemCheckStates as item, index}
		<label class="label cursor-pointer">
			<span class="label-text">{item.name}</span>
			<input
				type="checkbox"
				bind:checked={itemCheckStates[index].checked}
				on:change={setItemsToUser}
				class="checkbox checkbox-primary"
			/>
		</label>
	{/each}
</div>

<style>
	.form-control {
		width: 300px;
	}
</style>
