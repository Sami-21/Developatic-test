import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.APP_URL,
    timeout: 1000,
});

export default axiosInstance;
