import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CallbackPage = () => {
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                setIsLoading(true);

                const searchParams = window.location.search;

                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/token${searchParams}`, { 
                    headers  : {
                        'Content-Type': 'application/json'
                    }
                });

                const userData = {
                    token: response.data.data.token,
                    user : response.data.data.user,
                    url: `${process.env.REACT_APP_PUBLIC_URL}/${response.data.data.user.username}`
                };
                
                localStorage.setItem('user', JSON.stringify(userData));

                navigate(`/${response.data.data.user.username}`, { replace: true });
            } catch (error) {
                console.error('Authentication failed:', error);
                
                setError(error.response?.data?.message || 
                    'Authentication failed. Please try again.');

                setTimeout(() => {
                    navigate('/', { replace: true });
                }, 3000);

            } finally {
                setIsLoading(false);
            }
        };

        handleAuthCallback();

    }, [navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl mb-4">Completing your sign-in...</h2>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <h2 className="text-xl mb-2">Authentication Error</h2>
                    <p>{error}</p>
                    <p className="mt-2">Redirecting to main page...</p>
                </div>
            </div>
        );
    }

    // Default loading state (should rarely be seen)
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-xl">Processing...</h2>
            </div>
        </div>
    );
};

export default CallbackPage;