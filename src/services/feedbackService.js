import Axios from 'axios'
const MOCK_API_URL = "https://6239be97bbe20c3f66c93c18.mockapi.io/api"
var axios = Axios.create({
    withCredentials: false
})

export function createFeedback(data) {
    const request = {
        url: `${MOCK_API_URL}/v1/feedback`,
        method: 'POST',
        data
    };
    return performRequest(request);
}

export function updateFeedback(data, id) {
    const request = {
        url: `${MOCK_API_URL}/v1/feedback/${id}`,
        method: 'PUT',
        data
    };
    return performRequest(request);
}

async function performRequest(request) {
    try {
        const res = await axios(request);
        return res.data;
    } catch (err) {
        console.log(`${err}`);
        throw err;
    }
}