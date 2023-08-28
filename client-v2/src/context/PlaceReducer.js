const PlaceReducer = (state, action) => {
    switch (action.type) {
        case 'TYPE': {
            return {
                ...state,
                type: action.payload
            }
        }

        case 'AREA': {
            return {
                ...state,
                area: action.payload
            }
        }

        case 'ADDRESS': {
            return {
                ...state,
                address: action.payload
            }
        }

        case 'STATS': {
            return {
                ...state,
                stats: action.payload
            }
        }

        case 'PERKS': {
            return {
                ...state,
                perks: action.payload
            }
        }

        case 'PHOTOS': {
            return {
                ...state,
                photos: action.payload
            }
        }

        case 'TITLE': {
            return {
                ...state,
                title: action.payload
            }
        }

        case 'HIGHLIGHTS': {
            return {
                ...state,
                highlights: action.payload
            }
        }

        case 'DESCRIPTION': {
            return {
                ...state,
                description: action.payload
            }
        }

        case 'GUEST_TYPE': {
            return {
                ...state,
                guestType: action.payload
            }
        }

        case 'PRICE': {
            return {
                ...state,
                price: action.payload
            }
        }

        case 'DISCOUNTS': {
            return {
                ...state,
                discounts: action.payload
            }
        }

        case 'LAST_STEP': {
            return {
                ...state,
                lastStep: action.payload
            }
        }

        case 'SET_TO_EDIT': {
            return action.payload
        }

        case 'SET_EDIT': {
            return {
                ...state,
                edit: action.payload
            }
        }

        case 'RESET_STATE': {
            return action.payload
        }

        default: {
            return state
        }
    }
}

export default PlaceReducer