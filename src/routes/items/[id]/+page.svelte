<script>
	export let data;
	import ItemDetail from '../../../components/items/itemDetail.svelte';
	console.log(data);
</script>

<ItemDetail item={data} />
