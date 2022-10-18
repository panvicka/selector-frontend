<script>
	export let data;
	import PersonDetail from '../../../components/personDetail.svelte';
	console.log(data);
</script>

<PersonDetail person={data} />
