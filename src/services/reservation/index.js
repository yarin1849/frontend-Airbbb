const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { reservationService as local } from './reservation.service.local'
import { reservationService as remote } from './reservation.service.remote'

function getEmptyReservation() {
    return {
        _id: makeId(),
        price: 0,
        imgUrls: [],
        name: '',
        type: '',
        summary: '',
        capacity: 1,
        amenities: [],
        labels: [],
        host: {
            _id: '',
            fullname: '',
            imgUrl: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739434710/airbnb-image_muycbi.jpg',
        },
        loc: {
            country: 'Portugal',
            countryCode: 'PT',
            city: 'Lisbon',
            address: '17 Kombo st',
            lat: -8.61308,
            lng: 41.1413,
        },
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        where: '',
        checkIn: '',
        checkOut: '',
        guests: 0,
        label: ''
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const reservationService = { getEmptyReservation, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.reservationService = reservationService
