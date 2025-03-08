import axios from "axios";

export const verify = async (data) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/verifier/verify-credential`, data, {
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        if(response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}