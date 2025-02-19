export const SET_RESERVATIONS = 'SET_RESERVATIONS'
export const SET_RESERVATION = 'SET_RESERVATION'
export const ADD_RESERVATION = 'ADD_RESERVATION'
export const REMOVE_RESERVATION = 'REMOVE_RESERVATION'
export const UPDATE_RESERVATION = 'UPDATE_RESERVATION'

const initialState = {
    reservations: [],
    reservation: null,
}

export function reservationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_RESERVATIONS:
            return { ...state, reservations: action.reservations }
            break
        case SET_RESERVATION:
            return { ...state, reservation: action.reservation }
            break
        case ADD_RESERVATION:
            return { ...state, reservations: [...state.reservations, action.reservation] }

        case REMOVE_RESERVATION:
            return { ...state, reservations: state.reservations.filter(res => res._id !== action.reservationId) }

        case UPDATE_RESERVATION:
            return {
                ...state,
                reservations: state.reservations.map(res => res._id === action.reservation._id ? action.reservation : res)
            }

        default:
            return state
    }
}
