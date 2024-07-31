import { useState, useEffect } from 'react';

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
                const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=IN,36&key=1ef66fe567574e0aae8ff7daae9b7790`);
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
