import { useState, useEffect } from 'react'

// eslint-disable-next-line import/no-anonymous-default-export
export default HttpClient => {
    const [error, setError] = useState(null)

    const reqInterceptor = HttpClient.interceptors.request.use(req => {
        setError(null)
        return req;
    });
    const resInterceptor = HttpClient.interceptors.response.use(res => res, error => {
        setError(error)
    });

    useEffect(() => {
        return () => {
            HttpClient.interceptors.request.eject(reqInterceptor);
            HttpClient.interceptors.response.eject(resInterceptor);
        }
    }, [HttpClient, reqInterceptor, resInterceptor])

    const errorConfirmedHandler = () => {
        setError(null)
    }

    return [error, errorConfirmedHandler]
}
