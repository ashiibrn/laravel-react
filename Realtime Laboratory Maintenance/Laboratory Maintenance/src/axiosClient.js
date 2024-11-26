import axios from "axios";

// Create axios client instance
const axiosClient = axios.create({
    baseURL: "http://192.168.0.32:8000/api", // Ensure this matches your backend URL
});

// Request interceptor to attach the token to headers if available
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiration or other errors
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const { response } = error;

        // If the token has expired or is invalid (401 Unauthorized)
        if (response && response.status === 401) {
            const refreshToken = localStorage.getItem("REFRESH_TOKEN");
            if (refreshToken) {
                try {
                    // Attempt to refresh the token
                    const refreshResponse = await axios.post("http://127.0.0.1:8000/api/auth/refresh-token", {
                        refresh_token: refreshToken,
                    });

                    // Store new access token and retry the original request
                    const newAccessToken = refreshResponse.data.token;
                    localStorage.setItem("ACCESS_TOKEN", newAccessToken);

                    // Retry the original request with the new token
                    error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axios(error.config); // Retry the failed request
                } catch (refreshError) {
                    // If token refresh fails, log the user out
                    console.error("Token refresh failed:", refreshError);
                    localStorage.removeItem("ACCESS_TOKEN");
                    localStorage.removeItem("REFRESH_TOKEN");
                    window.location.href = "/login"; // Redirect to login
                    return Promise.reject(refreshError);
                }
            } else {
                // No refresh token, logout the user
                console.error("No refresh token found, logging out...");
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("REFRESH_TOKEN");
                window.location.href = "/login"; // Redirect to login
                return Promise.reject(error);
            }
        }

        // Handle other error statuses
        if (response && response.status === 404) {
            console.error("Resource not found");
        } else if (response && response.status === 500) {
            console.error("Server error, please try again later");
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
