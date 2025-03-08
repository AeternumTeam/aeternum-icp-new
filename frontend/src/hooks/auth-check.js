import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const checkAuthStatus = useCallback(async () => {
        try {
            setError(null);

            const authorization = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/logged_in`, { 
                headers  : {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + authorization
                }
            });

            const { loggedIn, data } = response.data;
            const { token } = data;
            
            if(localStorage.getItem('user') && loggedIn) {
                const data = JSON.parse(localStorage.getItem('user'));
                const updatedData = { token, user : data.user, url : data.url }
                localStorage.setItem('user', JSON.stringify(updatedData));
            }

            setIsAuthenticated(loggedIn);
            setUser(data);
        } catch (error) {
            console.error('Auth check failed:', error);
            
            setIsAuthenticated(false);
            setUser(null);
            setError(error.response?.data?.message || 'Authentication check failed');
            
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    return {
        isAuthenticated,
        user,
        error,
        checkAuthStatus
    };
};

export default useAuth;