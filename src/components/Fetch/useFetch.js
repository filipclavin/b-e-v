import { useState, useEffect } from 'react';

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        const controller = new AbortController();
       /*  setTimeout(() => { */
            fetch(url, { signal: controller.signal })
        .then(res => {
            if(!res.ok){
                throw Error('Error while loading');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsLoading(false);
            setError(null);
        })
        .catch(err => {
            if(err.name === 'AbortError') {
                console.log('fetch aborted')
            }else {
            setIsLoading(false);
            setError(err.message);
        }
        })
            
       /*  }, '') */

        return () => controller.abort();

    }, []);

    return{ data, isLoading, error }
}

export default useFetch;