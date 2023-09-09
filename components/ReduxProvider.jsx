"use client";

import { Provider } from "react-redux";
import store from '../app/redux/store.jsx'
const GoogleProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default GoogleProvider


