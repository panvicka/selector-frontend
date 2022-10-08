import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const url = `http://localhost:9090/rotationItems/get/${params.id}`;
	const res = await fetch(url);

	const data = await res.json();
	console.log('jednotlivy');
	console.log(data.rotationItemId);
	if (data) {
		return data.rotationItemId;
	}

	throw error(404, 'Not found');
}
