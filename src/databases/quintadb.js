const quintadb = {
	api_key: 'YOUR_API_KEY',
	app_token: 'YOUR_APP_TOKEN',
};

export const saveData = async (key, value) => {
	await fetch(
		`https://api.quintadb.com/v1/objects/${quintadb.app_token}/data`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${quintadb.api_key}`,
			},
			body: JSON.stringify({ key, value }),
		}
	);
};

export const getData = async (key) => {
	const response = await fetch(
		`https://api.quintadb.com/v1/objects/${quintadb.app_token}/data/${key}`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${quintadb.api_key}`,
			},
		}
	);
	const data = await response.json();
	return data.value;
};
