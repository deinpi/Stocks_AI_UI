import axios from "axios";
import { toast } from "react-toastify";

const ApiController = async (url, endpoint, body, method = "POST", token = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        console.log("API Request:", { url, endpoint });

        const response = await axios({
            url: `${url}${endpoint}`,
            method: method,
            data: body,
            headers: headers,
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error("Error making API request:", error);

        if (error.response) {
            // **Handle HTTP Errors**
            if (error.response.status === 400) {
                const errorMessage = error.response.data?.msg|| "Bad Request!";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(`Error: ${error.response.status} - ${error.response.statusText}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } else if (error.request) {
            // **Handle Network Errors**
            toast.error("Network error! Please check your connection.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            // **Handle Unknown Errors**
            toast.error("An unexpected error occurred!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        throw error; // Re-throw to handle it at the caller level if needed
    }
};

export default ApiController;
