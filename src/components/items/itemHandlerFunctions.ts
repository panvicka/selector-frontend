import { createItem, deleteItem, updateItem } from '../../api/item';


export const handleCreateNew = async (event, fetchAllFunction) => {
	await createItem({
		name: event.detail.item.name,
		memberTitles: event.detail.item.memberTitles
	});
	fetchAllFunction();
};

export const handleDeleteItem = async (itemId, fetchAllFunction) => {
	await deleteItem(itemId);
	fetchAllFunction();
};

export const handleEditItem = async (event, itemId, fetchAllFunction) => {
	await updateItem(itemId, event.detail.item);
	fetchAllFunction();
};
