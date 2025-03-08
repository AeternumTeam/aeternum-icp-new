import axios from "axios";

const login = async (event) => {
    event.preventDefault();
    try {
        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`, data, {
            headers  : {
                'Content-Type': 'application/json'
            },
        })
    } catch (error) {
        console.log(error)
    }
}

const loginGoogle = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/url`, {
            headers  : {
                'Content-Type': 'application/json'
            },
        });

        const result = response.data;
        const { url } = result.data;

        window.location.assign(url);
    } catch (error) {
      console.log(error)
    }
}

const logout = async () => {
    try {
        const dataUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const authorization = dataUser.token;

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/logout`, {} ,{ 
            headers  : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authorization
            },
        });

        if(response.status && response.status === 200) {
            localStorage.removeItem('user');
            window.location.href = '/';
        }
    } catch (error) {
        console.error(error);
    }
};

export { login, loginGoogle, logout }