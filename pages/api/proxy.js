export default async function handler(req, res) {
    const { method, headers, body } = req;

    // Set up the URL and options for your API request
    const apiUrl = 'https://your-backend-url.com/api/';  // Change to your actual backend URL

    const response = await fetch(apiUrl, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: method === 'POST' ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    res.status(response.status).json(data);
}