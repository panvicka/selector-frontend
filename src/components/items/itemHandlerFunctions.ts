import { createItem, deleteItem, getItemPeopleAttendance, updateItem } from '../../api/item';

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

export const getAllPeopleAndRoleCount = async (itemId) => {
	return await getItemPeopleAttendance(itemId);
};
