export const SET_STAYS = 'SET_STAYS'
export const SET_STAY = 'SET_STAY'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const ADD_STAY_MSG = 'ADD_STAY_MSG'

const initialState = {
    stays: [],
    stay: null,
}

export function stayReducer(state = initialState, action) {
    var newState = state
    var stays

    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays }
            break
        case SET_STAY:
            newState = { ...state, stay: action.stay }
            break
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays, lastRemovedStay }
            break
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] }
            // console.log('...state', ...state)
            break
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        case ADD_STAY_MSG:
            newState = { ...state, stay: { ...state.stay, msgs: [...state.stay.msgs || [], action.msg] } }
            break
        default:
            return state
    }
    return newState
}

// unitTestReducer()

function unitTestReducer() {
    var state = initialState
    const stay1 = { _id: 'b101', type: 'Stay ' + parseInt(Math.random() * 10), msgs: [] }
    const stay2 = { _id: 'b102', type: 'Stay ' + parseInt(Math.random() * 10), msgs: [] }

    state = stayReducer(state, { type: SET_STAYS, stays: [stay1] })
    console.log('After SET_STAYS:', state)

    state = stayReducer(state, { type: ADD_STAY, stay: stay2 })
    console.log('After ADD_STAY:', state)

    state = stayReducer(state, { type: UPDATE_STAY, stay: { ...stay2, type: 'Good' } })
    console.log('After UPDATE_STAY:', state)

    state = stayReducer(state, { type: REMOVE_STAY, stayId: stay2._id })
    console.log('After REMOVE_STAY:', state)

    const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
    state = stayReducer(state, { type: ADD_STAY_MSG, stayId: stay1._id, msg })
    console.log('After ADD_STAY_MSG:', state)

    state = stayReducer(state, { type: REMOVE_STAY, stayId: stay1._id })
    console.log('After REMOVE_STAY:', state)
}

