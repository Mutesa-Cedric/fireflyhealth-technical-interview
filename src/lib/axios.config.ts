import _ from "axios";

const axios = _.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

export default axios;