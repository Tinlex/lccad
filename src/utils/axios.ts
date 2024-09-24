import axios, { type InternalAxiosRequestConfig } from "axios"

const customAxios = axios.create({
  baseURL: "https://wallet.leksster.com/api/v1" //! TODO Move to env variable
})

customAxios.interceptors.request.use(
  function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    let token = localStorage.getItem("token")
    if (token) {
      token = token.replace(/"/g, "") // Clean the token from quotes
      // Set the Authorization header directly
      config.headers["Token"] = `${token}`
    }
    return config
  },
  function (error) {
    // Handle the 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      console.log("Token is invalid")
    }
    return Promise.reject(error)
  }
)

export default customAxios
