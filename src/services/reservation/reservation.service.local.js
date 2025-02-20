
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
        const reservationToSave = {
            _id: makeId(), // after that need to connect the real stay.id
            host: {
                _id: "h101",
                name: "John Doe"
            },
            user: {
                // _id: data.userId,
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
            checkin: "5/5/2025",
            checkout: "5/6/2025"
        }
        savedReservation = await storageService.post(STORAGE_KEY, reservationToSave)
    }
    return savedReservation
}


function _createReservations() {
    let reservations = loadFromStorage(STORAGE_KEY)
    if (!reservations || !reservations.length) {

        const reservations = [
            {
              _id: makeId(),
              stayId: "s101",
              host: { _id: "h101", name: "John Doe" },
              user: { _id: "u202", name: "Jane Smith" },
              price: 250,
              status: "pending",
              location: { country: "Portugal", city: "Lisbon", address: "17 Kombo st", lat: -8.61308, lng: 41.1413 },
              // Past date (February 2022)
              checkin: "2/1/2022",
              checkout: "2/6/2022"
            },
            {
              _id: makeId(),
              stayId: "s102",
              host: { _id: "h102", name: "Alice Johnson" },
              user: { _id: "u203", name: "Michael Brown" },
              price: 300,
              status: "approved",
              location: { country: "France", city: "Paris", address: "25 Champs Elysees", lat: 48.8566, lng: 2.3522 },
              checkin: "6/10/2025",
              checkout: "6/15/2025"
            },
            {
              _id: makeId(),
              stayId: "s103",
              host: { _id: "h103", name: "Emma Wilson" },
              user: { _id: "u204", name: "Daniel Garcia" },
              price: 150,
              status: "declined",
              location: { country: "Italy", city: "Rome", address: "10 Via Roma", lat: 41.9028, lng: 12.4964 },
              // Past date (August 2024)
              checkin: "8/20/2024",
              checkout: "8/25/2024"
            },
            {
              _id: makeId(),
              stayId: "s104",
              host: { _id: "h104", name: "Liam Miller" },
              user: { _id: "u205", name: "Sophia Davis" },
              price: 275,
              status: "pending",
              location: { country: "Spain", city: "Barcelona", address: "12 La Rambla", lat: 41.3851, lng: 2.1734 },
              checkin: "8/5/2025",
              checkout: "8/10/2025"
            },
            {
              _id: makeId(),
              stayId: "s105",
              host: { _id: "h105", name: "Noah Anderson" },
              user: { _id: "u206", name: "Isabella Martinez" },
              price: 200,
              status: "approved",
              location: { country: "Germany", city: "Berlin", address: "5 Alexanderplatz", lat: 52.5200, lng: 13.4050 },
              checkin: "9/1/2025",
              checkout: "9/7/2025"
            },
            {
              _id: makeId(),
              stayId: "s106",
              host: { _id: "h106", name: "Olivia Thomas" },
              user: { _id: "u207", name: "Ethan Robinson" },
              price: 350,
              status: "declined",
              location: { country: "Netherlands", city: "Amsterdam", address: "14 Dam Square", lat: 52.3676, lng: 4.9041 },
              checkin: "10/15/2025",
              checkout: "10/20/2025"
            },
            {
              _id: makeId(),
              stayId: "s107",
              host: { _id: "h107", name: "William White" },
              user: { _id: "u208", name: "Mia Harris" },
              price: 400,
              status: "pending",
              location: { country: "Switzerland", city: "Zurich", address: "8 Bahnhofstrasse", lat: 47.3769, lng: 8.5417 },
              checkin: "11/5/2025",
              checkout: "11/12/2025"
            },
            {
              _id: makeId(),
              stayId: "s108",
              host: { _id: "h108", name: "James Walker" },
              user: { _id: "u209", name: "Charlotte Clark" },
              price: 275,
              status: "approved",
              location: { country: "Belgium", city: "Brussels", address: "7 Grand Place", lat: 50.8503, lng: 4.3517 },
              checkin: "12/1/2025",
              checkout: "12/6/2025"
            }
          ]
          

        saveToStorage(STORAGE_KEY, reservations)
    }
}