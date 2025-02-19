import { httpService } from '../http.service'

export const reservationService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(`reservation`, filterBy)
}

function getById(reservationId) {
    return httpService.get(`reservation/${reservationId}`)
}

async function remove(reservationId) {
    return httpService.delete(`reservation/${reservationId}`)
}
async function save(reservation) {
    console.log('bobobo');

    var savedReservation
    if (reservation._id) {
        savedReservation = await httpService.put(`reservation/${reservation._id}`, reservation)
    } else {
        savedReservation = await httpService.post('reservation', reservation)
    }
    return savedReservation
}

async function addReservationMsg(reservationId, txt) {
    const savedMsg = await httpService.post(`reservation/${reservationId}/msg`, { txt })
    return savedMsg
}