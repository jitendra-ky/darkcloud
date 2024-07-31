import { useState, useEffect } from 'react';

// Array of API keys
const API_KEYS = [
    '1ef66fe567574e0aae8ff7daae9b7790',
    '3968f172ff8242279e2511140acac2a5',
    
    // Add more keys as needed
];

const getRandomApiKey = () => {
    const randomIndex = Math.floor(Math.random() * API_KEYS.length);
    return API_KEYS[randomIndex];
};

const useWeather = (city) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) {
            setData(null);
            setLoading(false);
            return;
        }

        const fetchWeather = async () => {
            try {
                setLoading(true);
                const apiKey = getRandomApiKey();
                const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=IN,36&key=${apiKey}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    return { data, loading, error };
};

export default useWeather;
