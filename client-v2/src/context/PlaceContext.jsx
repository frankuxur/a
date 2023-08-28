import { createContext, useReducer } from "react"
import PlaceReducer from './PlaceReducer'


// initial state
const initialState = {
    type: '',
    area: '',
    address: {
        country: '',
        house: '',
        area: '',
        street: '',
        landmark: '',
        city: '',
        pin: '',
        state: '',
    },
    stats: {
        guests: 1,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
    },
    perks: [],
    photos: [],
    title: '',
    highlights: [],
    description: '',
    guestType: '',
    price: '',
    discounts: [],
    lastStep: [],

    // edit already existing place
    edit: false,
}

// create context
export const PlaceContext = createContext({})

// provider component
export const PlaceContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PlaceReducer, initialState)

    // set type
    function setType(type) {
        dispatch({ type: 'TYPE', payload: type })
    }

    // set guest area
    function setArea(area) {
        dispatch({ type: 'AREA', payload: area })
    }

    // set address
    function setAddress(address) {
        dispatch({ type: 'ADDRESS', payload: address })
    }

    // set stats
    function setStats(stats) {
        dispatch({ type: 'STATS', payload: stats })
    }

    // set perks
    function setPerks(perks) {
        dispatch({ type: 'PERKS', payload: perks })
    }

    // set photos
    function setPhotos(photos) {
        dispatch({ type: 'PHOTOS', payload: photos })
    }

    // set photos
    function setTitle(title) {
        dispatch({ type: 'TITLE', payload: title })
    }

    // set highlights
    function setHighlights(highlights) {
        dispatch({ type: 'HIGHLIGHTS', payload: highlights })
    }

    // set description
    function setDescription(description) {
        dispatch({ type: 'DESCRIPTION', payload: description })
    }

    // set guest type
    function setGuestType(type) {
        dispatch({ type: 'GUEST_TYPE', payload: type })
    }

    // set price
    function setPrice(price) {
        dispatch({ type: 'PRICE', payload: price })
    }

    // set discounts
    function setDiscounts(discounts) {
        dispatch({ type: 'DISCOUNTS', payload: discounts })
    }

    // set last step
    function setLastStep(lastStep) {
        dispatch({ type: 'LAST_STEP', payload: lastStep })
    }

    // reset state
    function resetState() {
        dispatch({ type: 'RESET_STATE', payload: {
            type: '',
            area: '',
            address: {
                country: '',
                house: '',
                area: '',
                street: '',
                landmark: '',
                city: '',
                pin: '',
                state: '',
            },
            stats: {
                guests: 1,
                bedrooms: 1,
                beds: 1,
                bathrooms: 1,
            },
            perks: [],
            photos: [],
            title: '',
            highlights: [],
            description: '',
            guestType: '',
            price: '',
            discounts: [],
            lastStep: [],
            edit: false,
        }})
    }

    // set state to edit
    function setToEdit(place) {
        dispatch({ type: 'SET_TO_EDIT', payload: place })
    }

    // edit exisitng place (true / false)
    function setEdit(edit) {
        dispatch({ type: 'SET_EDIT', payload: edit })
    }


    return <PlaceContext.Provider value={{
        setType,
        type: state.type,
        setArea,
        area: state.area,
        setAddress,
        address: state.address,
        setStats,
        stats: state.stats,
        setPerks,
        perks: state.perks,
        setPhotos,
        photos: state.photos,
        setTitle,
        title: state.title,
        setHighlights,
        highlights: state.highlights,
        setDescription,
        description: state.description,
        setGuestType,
        guestType: state.guestType,
        setPrice,
        price: state.price,
        setDiscounts,
        discounts: state.discounts,
        setLastStep,
        lastStep: state.lastStep,
        resetState,
        setToEdit,
        setEdit,
        edit: state.edit,
        // for place id
        place: state,
    }}>
        {children}
    </PlaceContext.Provider>
}