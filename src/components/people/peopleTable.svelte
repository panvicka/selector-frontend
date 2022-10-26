<script>
	import Grid from 'gridjs-svelte';
	import { h } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';
	import dayjs from 'dayjs';

	export let data = {};
	export let item = {};

	console.log(data);
	console.log(item);
	let grid;
	let mappedTableData;
	let columns;

	let mapColumns = (item) => {
		let dateColumns = [];
		item.memberTitles.forEach((title) => {
			dateColumns.push(`${title}`);
			dateColumns.push(`lastTimeIn${title}`);
		});

 
		return ['name', ...dateColumns];
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
				const allDates = roleAttendance.dates.map((date) => {
					return dayjs(date).format('DD/MM/YYYY');
				});
				if (position !== -1) {
					tableData[position][key] = roleAttendance.attended;
 					tableData[position][`lastTimeIn${key}`] = roleAttendance.latestDate ? dayjs(roleAttendance.latestDate).format(
						'DD/MM/YYYY'
					) : "";
				} else {
					tableData.push({
						name: roleAttendance.name,
						[key]: roleAttendance.attended,
 
						[`lastTimeIn${key}`]: roleAttendance.latestDate ? dayjs(roleAttendance.latestDate).format('DD/MM/YYYY') : "",
					});
				}
			});
		}
		console.log(tableData);

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

<style global>
	/* @import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css'; */

	td.gridjs-td {
		word-break: break-all;
	}

	.people-table tr:hover td {
		background: hsl(var(--nf));
	}

	.people-table td {
		background: hsl(var(--n));
		color: hsl(var(--bc));
		border-color: hsl(var(--p));
	}

	.people-table th {
		background: hsl(var(--n));
		color: hsl(var(--p)) !important;
	}

	.gridjs-table {
		border: none !important;
		width: 100%;
	}
	.gridjs-wrapper {
		border: none;
		width: 80%;
		max-width: 900px;
		margin: 0 auto;
	}
</style>
