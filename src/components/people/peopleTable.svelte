<script>
	import Grid from 'gridjs-svelte';
	import { h } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';
	import { arrow } from '@popperjs/core';

	export let data = {};
	export let item = {};

	console.log(data);
	console.log(item);
	let grid;
	let mappedTableData;
	let columns;

	let mapColumns = (item) => {
		return ['name', ...item.memberTitles];
	};

	const test = {
		main: [
			{
				name: 'Sven',
				_id: '634effc8ea122e72a9a21965',
				attended: 2
			},
			{
				name: 'Petr',
				_id: '634f0086ea122e72a9a21972',
				attended: 0
			}
		],
		support: [
			{
				name: 'Sven',
				_id: '634effc8ea122e72a9a21965',
				attended: 0
			},
			{
				name: 'Petr',
				_id: '634f0086ea122e72a9a21972',
				attended: 2
			}
		]
	};

	const findKeyPositionInArray = (arr, key, value) => {
		return arr.findIndex((element) => {
			if (element[key] == value) {
				return true;
			}
		});
	};

	let mapData = (data) => {
		let tableData = [];

		for (const key in data) {
			console.log(key);
			data[key].forEach((roleAttendance) => {
				const position = findKeyPositionInArray([...tableData], 'name', roleAttendance.name);
				if (position !== -1) {
					tableData[position][key] = roleAttendance.attended;
				} else {
					tableData.push({ name: roleAttendance.name, [key]: roleAttendance.attended });
				}
			});
		}
		console.log();

		return tableData;
	};

	mappedTableData = mapData(data);
	columns = mapColumns(item);

	const className = {
		container: 'people-table'
	};

	$: {
		if (grid) {
			mappedTableData = mapData(data);
			columns = mapColumns(item);
			grid.updateConfig({ data: mappedTableData, columns: columns }).forceRender();
		}
	}
</script>

<Grid bind:instance={grid} data={mappedTableData} {columns} sort={true} {className} />
