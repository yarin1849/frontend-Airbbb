const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay() {
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
        // txt: '',
        // minPrice: '',
        // sortField: '',
        // sortDir: '',
        label: ''
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService
