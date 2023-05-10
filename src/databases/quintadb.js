const quintadb = {
	api_key: 'caW6rGW6PcKiFdVg7dSmkp',
	api_get_db_url:
		'https://quintadb.com.ua/apps/bcW4hdJCnbfykrW7HSrmkF/dtypes/entity/btCSokpwTcOioWWPBcLcKs.json?rest_api_key=cWh8kYpmjhayoCcJCVWO9X&amp;view=',
	app_token: 'YOUR_APP_TOKEN',
	api_create_note_url:
		'https://quintadb.com.ua/apps/bcW4hdJCnbfykrW7HSrmkF/dtypes.json?rest_api_key=cWh8kYpmjhayoCcJCVWO9X',
};

export const createNote = async (noteData) => {
	try {
		const response = await fetch(quintadb.api_create_note_url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				values: {
					entity_id: 'btCSokpwTcOioWWPBcLcKs',
					bfvftcRmjgtBepW75UjYKT: noteData.created,
					'ddP2tdGNHjW454x8o-BH8L': noteData.note,
				},
			}),
		});
		const data = await response.json();
		return data.record.id;
	} catch (e) {
		throw new Error(e);
	}
};

export const updateNote = async (noteId, noteData) => {
	try {
		const response = await fetch(
			`https://quintadb.com.ua/apps/bcW4hdJCnbfykrW7HSrmkF/dtypes/${noteId}.json?rest_api_key=cWh8kYpmjhayoCcJCVWO9X`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					values: {
						entity_id: 'btCSokpwTcOioWWPBcLcKs',
						'ddP2tdGNHjW454x8o-BH8L': noteData,
					},
				}),
			}
		);
		const data = await response.json();
		const updatedNote = {
			id: data.record.id,
			created: data.record.values.bfvftcRmjgtBepW75UjYKT,
			note: data.record.values['ddP2tdGNHjW454x8o-BH8L'],
		};

		return updatedNote;
	} catch (e) {
		throw new Error(e);
	}
};

export const getData = async () => {
	try {
		const response = await fetch(quintadb.api_get_db_url);
		const data = await response.json();

		let dbData = [];
		if (data) {
			dbData = data.records.map((el) => ({
				id: el.id,
				created: el.values.bfvftcRmjgtBepW75UjYKT,
				note: el.values['ddP2tdGNHjW454x8o-BH8L'],
			}));
		}
		return dbData;
	} catch (e) {
		throw new Error(e);
	}
};

export const deleteNote = async (id) => {
	try {
		const response = await fetch(
			`https://quintadb.com.ua/apps/bcW4hdJCnbfykrW7HSrmkF/dtypes/${id}.json?rest_api_key=cWh8kYpmjhayoCcJCVWO9X`,
			{
				method: 'DELETE',
			}
		);
		const data = await response.json();
		return data;
	} catch (e) {
		throw new Error(e);
	}
};
