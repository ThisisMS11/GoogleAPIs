"use client";

import { GoogleAuthProvider } from "../context/GoogleAuth";

const GoogleProvider = ({ children }) => {
    return (
        <GoogleAuthProvider>
            {children}
        </GoogleAuthProvider>
    )
}

export default GoogleProvider


