const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'
import { reservationService as local } from './reservation.service.local'
import { reservationService as remote } from './reservation.service.remote'

function getEmptyReservation() {
    return {
        _id: makeId(),
        stayId: "",
        host: {
            _id: "",
            name: "",
        },
        user: {
            _id: "",
            name: "",
        },
        price: 0,
        status: "pending", // Possible values: 'pending', 'approved', 'rejected'
        location: {
            country: "",
            city: "",
            address: "",
            lat: 0,
            lng: 0
        },
        checkin: "",
        checkout: "",
        guests: 1,
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        where: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        label: ''
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const reservationService = { getEmptyReservation, getDefaultFilter, ...service }

if (DEV) window.reservationService = reservationService
