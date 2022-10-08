<script>
	export let data;
	import ItemDetail from '../../../components/itemDetail.svelte';
	console.log(data);
</script>

<ItemDetail item={data} />
