import {useState} from 'react';

const useHttp = ({url, method, body, headers}, applyData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                method: method || 'GET',
                headers: headers || {},
                body: body ? JSON.stringify(body) : null
            });

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            applyData(data);
        } catch (err) {
        setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    return { isLoading, error, sendRequest };
};

export default useHttp;