import { createContext, useEffect, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

// initial state
const initialState = {
    newUser: {},
    loggedInUser: {},
    welcomeState: false,
}

// create context
export const UserContext = createContext({})

// provider component
export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    useEffect(() => {
        // console.log(state.loggedInUser);
        axios.get('/profile', { withCredentials: true }).then(({data}) => {
            setUser(data)
        })
    }, [])

    // register new user
    function registerUser(userInfo) {
        dispatch({ type: 'REGISTER_USER', payload: userInfo })
    }

    // clear new user state
    function clearUserState() {
        dispatch({ type: 'CLEAR_USER_STATE' })
    }

    // logged in user
    function setUser(userData) {
        dispatch({ type: 'SET_USER', payload: userData })
    }

    // handle welcome modal state
    function handleWelcomeState(state) {
        dispatch({ type: 'WELCOME_STATE', payload: state })
    }

    // edit user's about
    // Hey! I am Ashish, and this is my awesome bio. So I am out tryna write a long bio and i am about to copy-paste some content to make this thing mega super duper ultra long so, yeah
    function setAboutUser(about) {
        dispatch({ type: 'SET_ABOUT_USER', payload: about })
    }

    // set user's photo
    function setUserPhoto(photo) {
        dispatch({ type: 'SET_USER_PHOTO', payload: photo })
    }

    return <UserContext.Provider value={{
        registerUser,
        clearUserState,
        setUser,
        user: state.loggedInUser,
        handleWelcomeState,
        welcomeState: state.welcomeState,
        setAboutUser,
        setUserPhoto,
    }}>
        {children}
    </UserContext.Provider>
}