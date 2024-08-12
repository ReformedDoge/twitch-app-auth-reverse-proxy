// pages/api/getToken.js
export default async function handler(req, res) {
    const {
        method
    } = req;

    if (method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    try {
        const response = await fetch('https://id.twitch.tv/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials',
            }),
        });

        const data = await response.json();
        if (response.ok) {
            return res.status(200).json({
                token: data.access_token
            });
        } else {
            return res.status(response.status).json(data);
        }
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to fetch token'
        });
    }
}