import axios from "axios"

const isDev = import.meta.env.DEV
const BASE_URL = isDev ? "/api" : "https://www.freetogame.com/api"

export const apiClient = axios.create({
  baseURL: BASE_URL,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.status_message ||
      error.message ||
      "An unexpected error occurred"
    return Promise.reject(new Error(message))
  }
)
