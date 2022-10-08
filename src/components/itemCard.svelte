<script>
	export let item;
</script>

<div class="card w-96 bg-base-100 shadow-xl" />
<div class="card-body">
	<h2 class="card-title"><a href={`items/${item._id}`}>{item.name}</a></h2>
	<ul>
		{#each item.memberTitles as memberTitle}
			<li>{memberTitle}</li>
		{/each}
	</ul>
</div>
<div class="card w-96 bg-base-100 shadow-xl" />
