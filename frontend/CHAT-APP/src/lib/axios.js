import axios from "axios"

export const axiosInstance=axios.create({
    baseURL:"https://realtime-chat-app-f6u3.onrender.com/api",
    withCredentials:true
})
