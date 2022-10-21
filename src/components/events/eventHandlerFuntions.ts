import { createEvent, updateEvent, deleteEvent } from '../../api/event';

export const handleCreateNewEvent = async (event, refetchFunction) => {
	const payload = {
		item: event.item._id,
		people: event.people,
		startDate: event.startDate,
		endDate: event.endDate
	};

	await createEvent(payload);

	if (typeof refetchFunction === 'function') {
		refetchFunction();
	}
};

export const handleUpdateEvent = async (event, refetchFunction) => {
	await updateEvent(event._id, {
		item: event.item._id,
		people: event.people,
		startDate: event.startDate,
		endDate: event.endDate
	});

	if (typeof refetchFunction === 'function') {
		refetchFunction();
	}
};

export const handleDeleteEvent = async (event, refetchFunction) => {
    await deleteEvent(event._id);
	if (typeof refetchFunction === 'function') {
		refetchFunction();
	}
};
