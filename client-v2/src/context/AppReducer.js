const AppReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_USER': {
            return {
                ...state,
                newUser: {
                    ...action.payload
                }
            }
        }

        case 'CLEAR_USER_STATE': {
            return {
                ...state,
                newUser: {}
            }
        }

        case 'SET_USER': {
            return {
                ...state,
                newUser: {},
                loggedInUser: {
                    ...action.payload
                }
            }
        }

        case 'WELCOME_STATE': {
            return {
                ...state,
                welcomeState: action.payload
            }
        }

        case 'SET_ABOUT_USER': {
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    about: action.payload
                }
            }
        }

        case 'SET_USER_PHOTO': {
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    photo: action.payload
                }
            }
        }
        
        default: {
            return state
        }
    }
}

export default AppReducer