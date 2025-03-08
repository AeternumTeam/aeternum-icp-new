import axios from "axios";

export const getBadges = async () => {
    const dataUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const authorization = dataUser.token;
    const id = dataUser.user.id;

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/issuer/issuer-credential/${id}`, {
            headers : {
                "Content-Type" : 'application/json',
                'Authorization': 'Bearer ' + authorization
            },
        });

        if(response.status === 200) {
            return response.data.data
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

export const analyzerFile = async (file) => {
    const dataUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const authorization = dataUser.token;
    const data = new FormData();
    data.append('file', file)
    try {
        const response = await axios.post(`${process.env.REACT_APP_AI_SERVER_URL}/ai/upload`, data, {
            headers : {
                "Content-Type" : 'multipart/form-data',
                'Authorization': 'Bearer ' + authorization
            },
        });

        if(response.status === 200) {
           return response.data.data
        }
    } catch (error) {
        console.log(error.response.data)
    }
}

export const addCredential = async (event) => {
    event.preventDefault();
    try{
        const dataUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        const authorization = dataUser.token;
        const id_issuer = dataUser.user.id;
        const issuer = dataUser.user.name;
        const email_issuer = dataUser.user.email;

        const data = new FormData();
        data.append('email', event.target.email.value);
        data.append('recipient', event.target.recipientName.value);
        data.append('email_issuer', email_issuer);
        data.append('id_issuer', id_issuer);
        data.append('issuer', issuer);
        data.append('certificateFile', event.target.certificateFile.files[0]);

        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/issuer/issuer-credential`, data, {
            headers : {
                "Content-Type" : 'multipart/form-data',
                'Authorization': 'Bearer ' + authorization
            },
        });

        if(response.status === 200) {
            window.location.reload();
        }
    }catch(error){
        console.log(error)
    }
}