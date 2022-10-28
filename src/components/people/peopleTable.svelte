<script>
	// @ts-nocheck
	import Grid from 'gridjs-svelte';
	import { h } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.css';
	import dayjs from 'dayjs';
	import { A } from 'flowbite-svelte';

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

		let mapped = dateColumns.map((i) => {
			if (i.startsWith('lastTime')) {
				return {
					name: i,
					sort: {
						compare: (a, b) => {
							if (!a) return -1;
							const distantFuture = dayjs('02/10/2060');
							const dateA = a ? dayjs(a, 'DD.MM.YYYY') : distantFuture;
							const dateB = b ? dayjs(b, 'DD.MM.YYYY') : distantFuture;
							if (dateA.isBefore(dateB)) {
								return 1;
							} else if (dateB.isBefore(dateA)) {
								return -1;
							} else {
								return 0;
							}
						}
					}
				};
			}

			return {
				name: i,
				width: '15%'
			};
		});

		console.log(mapped);
		return ['name', ...mapped];
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

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}

	let mapData = (data) => {
		let tableData = [];

		for (const key in data) {
			console.log(key);
			data[key].forEach((roleAttendance) => {
				const position = findKeyPositionInArray([...tableData], 'name', roleAttendance.name);
				const allDates = roleAttendance.dates.map((date) => {
					return formatDate(date);
				});
				if (position !== -1) {
					tableData[position][key] = roleAttendance.attended;
					tableData[position][`lastTimeIn${key}`] = roleAttendance.latestDate
						? formatDate(roleAttendance.latestDate)
						: '';
				} else {
					tableData.push({
						name: roleAttendance.name,
						[key]: roleAttendance.attended,

						[`lastTimeIn${key}`]: roleAttendance.latestDate
							? formatDate(roleAttendance.latestDate)
							: ''
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

	.people-table {
		line-height: 1;
	}

	.people-table tr:hover td {
		background: hsl(var(--nf));
	}

	.people-table td {
		background: hsl(var(--n));
		color: hsl(var(--bc));
		border-color: hsl(var(--nf));
	}

	.people-table th {
		background: hsl(var(--n));
		color: hsl(var(--af)) !important;
		border-color: hsl(var(--nf));
	}

	.people-table th:hover {
		background: hsl(var(--n));
		color: hsl(var(--af)) !important;
	}

	.gridjs-table {
		border: none !important;
		width: 100%;
	}
	.gridjs-wrapper {
		border: none;
		/* width: 80%;
		max-width: 900px; */
		margin: 0 auto;
	}
</style>
