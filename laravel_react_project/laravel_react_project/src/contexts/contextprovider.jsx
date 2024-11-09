import { useContext, useEffect ,useState, createContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    position: null,
    setUser: () => {},
    setToken: () => {},
    setPosition: () => {}
});



export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [position, setPosition] = useState(localStorage.getItem("POSITION") || null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }
        else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    useEffect(() => {
        if (position) {
            localStorage.setItem("POSITION", position); // Store position in localStorage for persistence across sessions
        }
    }, [position]);

    return (
        <StateContext.Provider value={{
            user,
            token,
            position,
            setUser,
            setToken,
            setPosition
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)