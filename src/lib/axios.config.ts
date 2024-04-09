import _ from "axios";

const axios = _.create({
    baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:3001",
});

export default axios;