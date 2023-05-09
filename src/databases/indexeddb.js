import { openDB } from 'idb';

const dbPromise = openDB('myDatabase', 1, {
	upgrade(db) {
		if (!db.objectStoreNames.contains('myNotes')) {
			db.createObjectStore('myNotes');
		}
	},
});

export const saveData = async (key, value) => {
	const db = await dbPromise;
	const tx = db.transaction('myNotes', 'readwrite');
	tx.store.put(value, key);
	await tx.done;
};

export const getData = async (key) => {
	const db = await dbPromise;
	return db.get('myNotes', key);
};
