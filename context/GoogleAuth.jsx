'use client';
import { useContext, createContext, useState } from "react";
import axios from "axios";
import { setCookie } from "cookies-next";

const GoogleAuthContext = createContext();

export function GoogleAuthProvider({ children }) {

    /* for handling the redirect from google */
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleTokenFromQueryParams = (accessToken, refreshToken) => {

        const expirationDate = newExpirationDate();
        // console.log("App.js 30 | expiration Date", expirationDate);
        if (accessToken && refreshToken) {
            storeTokenData(accessToken, refreshToken, expirationDate);
            setIsLoggedIn(true);
            return true;
        }
        return false;
    };

    /* setting the  expiration date of session data */
    const newExpirationDate = () => {
        var expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        return expiration;
    };

    /* storing the token data in session storage */
    const storeTokenData = async (token, refreshToken, expirationDate) => {
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("expirationDate", expirationDate);

        setCookie('accessToken', token);
        setCookie('refreshToken', refreshToken);
        setCookie('expirationDate', expirationDate);
    };

    /* for handling the token expiration */
    const tokenExpired = () => {
        const now = Date.now();

        const expirationDate = sessionStorage.getItem("expirationDate");
        const expDate = new Date(expirationDate);

        if (now > expDate.getTime()) {
            return true; // token expired
        }

        return false; // valid token
    };

    /* for getting a new token from the server */
    const getValidTokenFromServer = async (refreshToken) => {
        // get new token from server with refresh token
        try {
            const url = `${process.env.NEXT_PUBLIC_EXTERNAL_SERVER}/api/getValidToken`;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }
            const request = await axios.post(url, { refreshToken }, config);

            const token = request.data;

            return token;
        } catch (error) {
            throw new Error("Issue getting new token", error.message);
        }
    };

    /* for getting a token from session storage */
    const getToken = async () => {
        if (tokenExpired()) {
            const refreshtoken = sessionStorage.getItem("refreshToken");
            const token = await getValidTokenFromServer(refreshtoken);
            sessionStorage.setItem("accessToken", token.accessToken);
            sessionStorage.setItem("expirationDate", newExpirationDate());
            return token.accessToken;
        } else {
            console.log("tokens.js 11 | token not expired");
            return sessionStorage.getItem("accessToken");
        }
    };


    return (
        <GoogleAuthContext.Provider value={{ getToken, handleTokenFromQueryParams }}>
            {children}
        </GoogleAuthContext.Provider>
    )

}

export function useGoogleAuth() {
    return useContext(GoogleAuthContext);
}
