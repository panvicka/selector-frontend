<script>
	export let item;
</script>

<a href={`items/${item._id}`}>{item.name}</a>
<ul>
	{#each item.memberTitles as memberTitle}
		<li>{memberTitle}</li>
	{/each}
</ul>
