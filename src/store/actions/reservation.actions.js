import { reservationService } from '../../services/reservation'
import { store } from '../store'
import { ADD_RESERVATION, REMOVE_RESERVATION, SET_RESERVATION, SET_RESERVATIONS, UPDATE_RESERVATION } from '../reducers/reservation.reducer'

export async function loadReservations() {
    store.dispatch({ type: 'SET_LOADING', isLoading: true })

    setTimeout(async () => {
        try {
            const reservations = await reservationService.query()
            store.dispatch({ type: 'SET_RESERVATIONS', reservations })
        } catch (err) {
            console.error('Cannot load reservation', err)
        } finally {
            store.dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }, 1000)
}

export async function loadReservation(reservationId) {
    try {
        const reservation = await reservationService.getById(reservationId)
        store.dispatch(getCmdSetReservation(reservation))
    } catch (err) {
        console.log('Cannot load reservation', err)
        throw err
    }
}


export async function removeReservation(reservationId) {
    try {
        await reservationService.remove(reservationId)
        store.dispatch(getCmdRemoveReservation(reservationId))
    } catch (err) {
        console.log('Cannot remove reservation', err)
        throw err
    }
}

// export async function addReservation(data) {

//     try {
//         console.log('bla');
//         const savedReservation = await reservationService.save(data)
//         console.log('savedReservation', savedReservation)
//         store.dispatch(getCmdAddReservation(savedReservation))
//         return savedReservation;
//     } catch (err) {
//         console.error("Cannot add reservation", err)
//         throw err;
//     }
// }

export async function addReservation(data) {

    try {
        const savedReservation = await reservationService.save(data)
        store.dispatch(getCmdAddReservation(savedReservation)) // Now dispatching a plain object
        return savedReservation
    } catch (err) {
        console.error("Cannot add reservation", err)
        throw err
    }
}

// export const addReservation = (reservationData) => {
//     return async (dispatch) => {
//         try {
//             const savedReservation = await reservationService.save(reservationData)
//             dispatch({ type: "ADD_RESERVATION", reservation: savedReservation }) // ✅ Dispatching a plain object now
//             return savedReservation
//         } catch (err) {
//             console.error("Cannot add reservation", err)
//             throw err
//         }
//     }
// }



export async function updateReservation(reservation) {
    try {
        const savedReservation = await reservationService.save(reservation)
        store.dispatch(getCmdUpdateReservation(savedReservation))
        return savedReservation
    } catch (err) {
        console.log('Cannot save reservation', err)
        throw err
    }
}

// Command Creators:
function getCmdSetReservations(reservations) {
    return {
        type: SET_RESERVATIONS,
        reservations
    }
}

function getCmdSetReservation(reservation) {
    return {
        type: SET_RESERVATION,
        reservation
    }
}

function getCmdRemoveReservation(reservationId) {
    return {
        type: REMOVE_RESERVATION,
        reservationId
    }
}

function getCmdAddReservation(reservation) {
    return {
        type: ADD_RESERVATION,
        reservation
    }
}

function getCmdUpdateReservation(reservation) {
    return {
        type: UPDATE_RESERVATION,
        reservation
    }
}
