import Axios from 'axios'
const API_URL = "https://6239be97bbe20c3f66c93c18.mockapi.io/api/v1/feedback"
var axios = Axios.create({
    withCredentials: false
})

export const feedbackService = {
    sendFeedback
}

async function sendFeedback(endpoint,data,method) {
    try {
        const res = await axios({
            url: `${API_URL}${endpoint}`,
            method,
            data
        })
        res.data.msg = "Feedback sent! Thank you."
        return res.data;
    } catch (err) {
        console.log(`Had Issues saving, with data: ${data}`)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            err.msg="Failed sending Feedback. try later"///if its ok - delete comment
            throw err
        }
    }
}