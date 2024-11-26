import { useContext, useEffect, useState, createContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    position: null,
    setUser: () => {},
    setToken: () => {},
    setPosition: () => {},
    logout: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")) || {});
    const [position, setPosition] = useState(localStorage.getItem("POSITION") || null);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    // Function to set token and handle localStorage
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
            logout(); // Clear all relevant state on token removal
        }
    };

    // Function to handle logout and clear all state
    const logout = () => {
        _setToken(null);
        setUser({});
        setPosition(null);
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN"); // Ensure refresh token is also cleared
        localStorage.removeItem("POSITION");
        localStorage.removeItem("USER");
    };

    // Update localStorage whenever position changes
    useEffect(() => {
        if (position) {
            localStorage.setItem("POSITION", position);
        } else {
            localStorage.removeItem("POSITION");
        }
    }, [position]);

    // Optional: Sync user data with localStorage for persistence
    useEffect(() => {
        if (user && Object.keys(user).length) {
            localStorage.setItem("USER", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER");
        }
    }, [user]);

    return (
        <StateContext.Provider value={{
            user,
            token,
            position,
            setUser,
            setToken,
            setPosition,
            logout, // Expose logout function to easily clear all state
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
