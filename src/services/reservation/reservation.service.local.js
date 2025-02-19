
import { storageService } from '../async-storage.service'
import { makeId, saveToStorage, loadFromStorage } from '../util.service'
import { userService } from '../user'
// import data from '../../assets/data/reservation.json'
// import airbnbImage from '../../assets/img/airbnb-image.jpg'
import image from '../../assets/img/image.avif'
import profile from '../../assets/img/profile.avif'

const STORAGE_KEY = 'reservation'
_createReservations()

export const reservationService = {
    query,
    getById,
    save,
    remove,
    addReservationMsg,
}

window.cs = reservationService

async function query(filterBy = {}) {
    var reservations = await storageService.query(STORAGE_KEY)
    return reservations
}

function getById(reservationId) {
    return storageService.get(STORAGE_KEY, reservationId)
}

async function remove(reservationId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, reservationId)
}

// async function save(reservation) {
//     var savedReservation
//     if (reservation._id) {
//         const reservationToSave = {
//             _id: reservation._id,
//             price: reservation.price,
//         }
//         savedReservation = await storageService.put(STORAGE_KEY, reservationToSave)
//     } else {
//         const reservationToSave = {
//             type: reservation.type,
//             price: reservation.price,
//             // Later, host is set by the backend
//             // host: userService.getLoggedinUser(),
//         }
//         console.log('reservationToSave', reservationToSave)
//         savedReservation = await storageService.post(STORAGE_KEY, reservationToSave)
//     }
//     return savedReservation
// }

async function addReservationMsg(reservationId, txt) {
    // Later, this is all done by the backend
    const reservation = await getById(reservationId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    reservation.msgs.push(msg)
    await storageService.put(STORAGE_KEY, reservation)

    return msg
}

async function save(data) {
    var savedReservation
    
    if (data._id) {
        savedReservation = await storageService.put(STORAGE_KEY, data)
    } else {
        console.log('data', data)
        const reservationToSave = {
            // _id: makeId(),
            host: {
                _id: "h101",
                name: "John Doe"
            },
            user: {
                name: "Jane Smith"
            },
            price: 250,
            status: "pending",
            location: {
                country: "Portugal",
                city: "Lisbon",
                address: "17 Kombo st",
                lat: -8.61308,
                lng: 41.1413
            },
            checkin: "5/1/2025",
            checkout: "5/6/2025"
        }

        console.log(reservationToSave)
        savedReservation = await storageService.post(STORAGE_KEY, reservationToSave)
        console.log(savedReservation)
    }
    return savedReservation
}


function _createReservations() {
    let reservations = loadFromStorage(STORAGE_KEY)
    if (!reservations || !reservations.length) {
        // reservations = data

        reservations = [{
            _id: makeId(),
            stayId: "s101",
            host: {
                _id: "h101",
                name: "John Doe"
            },
            user: {
                _id: "u202",
                name: "Jane Smith"
            },
            price: 250,
            status: "pending", // 'pending', 'approved', 'rejected'
            location: {
                country: "Portugal",
                city: "Lisbon",
                address: "17 Kombo st",
                lat: -8.61308,
                lng: 41.1413
            },
            checkin: "5/1/2025",
            checkout: "5/6/2025"
        }]

        saveToStorage(STORAGE_KEY, reservations)
    }
}