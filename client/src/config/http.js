import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:8000"
});
http.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

export default http;