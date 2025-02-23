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
    const {checkin, checkout, guests, totalPrice, host, loc, name, user} = reservation
    var savedReservation
    if (reservation._id) {
        savedReservation = await httpService.put(`reservation/${reservation._id}`, reservation)
    } else {
        // will need to delete this when the reservation will be real
        const reservationToSave = {
                    name: name,
                    host: {
                        _id: host._id,
                        name: host.fullname,
                        img: host.thumbnailUrl

                    },
                    user: {
                        _id: user._id,
                        name: user.fullname,
                        img: user.imgUrl
                    },
                    price: totalPrice,
                    status: "pending",
                    location: loc,
                    checkin: checkin,
                    checkout: checkout
                }
        savedReservation = await httpService.post('reservation', reservationToSave)
    }
    return savedReservation
}

async function addReservationMsg(reservationId, txt) {
    const savedMsg = await httpService.post(`reservation/${reservationId}/msg`, { txt })
    return savedMsg
}