import { useState, useEffect, createContext, useContext } from 'react';

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

const TokenContext = createContext({ token: '', useToken: () => {} });

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token_photo_blog') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token_photo_blog', token);
        }
    }, [token]);

    const isLoggedIn = !!token;

    const getRawToken = () => {
        return parseJwt(token);
    };

    return (
        <TokenContext.Provider value={{ token, setToken, isLoggedIn, getRawToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    return useContext(TokenContext);
};
