import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY
const baseUrl = 'http://api.weatherstack.com';

const getCountry = async (country) => {
    const response = await axios.get(`${baseUrl}/current?access_key=${api_key}&query=${country}`);
    return response.data;
}

export default { getCountry }