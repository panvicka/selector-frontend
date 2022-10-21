import Api from '../services/Api';

export const getAllItems = async () => {
	try {
		const response = await Api.get('/rotationItems/get/');
		return response.rotationItems;
	} catch (error) {
		console.error(error);
	}
};

export const deleteItem = async (itemId) => {
	try {
		const response = await Api.delete(`/rotationItems/delete/${itemId}`);
		return response.rotationItems;
	} catch (error) {
		console.error(error);
	}
};

export const updateItem = async (itemId, payload) => {
	try {
		console.log(payload);

		const response = await Api.patch(`/rotationItems/update/${itemId}`, payload);
		console.log(response);
		return response.rotationItemId;
	} catch (error) {
		console.error(error);
	}
};

export const createItem = async (payload) => {
	try {
		// to do trimm trailing spaces
		const response = await Api.post(`/rotationItems/create/`, payload);
		console.log(response);
		return response.rotationItemId;
	} catch (error) {
		console.error(error);
	}
};

export const getItemById = async (itemId) => {
	try {
		const response = await Api.get(`/rotationItems/get/${itemId}`);
		console.log(response);
		return response.rotationItemId;
	} catch (error) {
		console.error(error);
	}
};
