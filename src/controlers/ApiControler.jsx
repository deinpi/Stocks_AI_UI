import axios from 'axios';

const ApiController = async (url, endpoint, body, method = 'POST', token = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios({
            url: `${url}/${endpoint}`,
            method: method,
            data: body,
            headers: headers,
        });

        return response.data;
    } catch (error) {
        console.error('Error making API request:', error);
        throw error;
    }
};

export default ApiController;