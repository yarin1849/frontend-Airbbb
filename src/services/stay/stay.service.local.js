
import { storageService } from '../async-storage.service'
import { makeId, saveToStorage, loadFromStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'stay'
_createStays()
export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg
}
window.cs = stayService


async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    const { txt, minPrice, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.type) || regex.test(stay.description))
    }
    if (minPrice) {
        stays = stays.filter(stay => stay.price >= minPrice)
    }
    if (sortField === 'type' || sortField === 'host') {
        stays.sort((stay1, stay2) =>
            stay1[sortField].localeCompare(stay2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'price') {
        stays.sort((stay1, stay2) =>
            (stay1[sortField] - stay2[sortField]) * +sortDir)
    }

    stays = stays.map(({ _id, type, price, host }) => ({ _id, type, price, host }))
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            price: stay.price,
            price: stay.price,
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            type: stay.type,
            price: stay.price,
            price: stay.price,
            // Later, host is set by the backend
            host: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    // Later, this is all done by the backend
    const stay = await getById(stayId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    stay.msgs.push(msg)
    await storageService.put(STORAGE_KEY, stay)

    return msg
}

function _createStays() {
    let stays = loadFromStorage(STORAGE_KEY)
    if (!stays || !stays.length) {
        stays = [
            {
                _id: 's101',
                name: 'Ribeira Charming Duplex',
                type: 'House',
                imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
                price: 80.0,
                summary: 'Fantastic duplex apartment...',
                capacity: 8,
                amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
                labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
                host: {
                    _id: 'u101',
                    fullname: 'Davit Pok',
                    imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
                },
                loc: {
                    country: 'Portugal',
                    countryCode: 'PT',
                    city: 'Lisbon',
                    address: '17 Kombo st',
                    lat: -8.61308,
                    lng: 41.1413,
                },
                reviews: [
                    {
                        id: 'r101',
                        txt: 'Very helpful hosts. Cooked traditional...',
                        rate: 4,
                        by: {
                            _id: 'u102',
                            fullname: 'user2',
                            imgUrl: '/img/img2.jpg',
                        },
                    },
                ],
                likedByUsers: ['mini-user'],
            },
            {
                _id: 's102',
                name: 'Ocean View Villa',
                type: 'Villa',
                imgUrls: ['https://img2.jpg', 'https://img3.jpg'],
                price: 150.0,
                summary: 'Luxury villa with breathtaking ocean views...',
                capacity: 6,
                amenities: ['Pool', 'Air Conditioning', 'Kitchen', 'Wifi'],
                labels: ['Luxury', 'Seaside', 'Romantic', 'Exclusive'],
                host: {
                    _id: 'u103',
                    fullname: 'Maria Lopez',
                    imgUrl: 'https://hostimg2.jpg',
                },
                loc: {
                    country: 'Spain',
                    countryCode: 'ES',
                    city: 'Barcelona',
                    address: '12 Beachside Ave',
                    lat: 41.3879,
                    lng: 2.16992,
                },
                reviews: [
                    {
                        id: 'r102',
                        txt: 'Amazing place, beautiful sunsets!',
                        rate: 5,
                        by: {
                            _id: 'u104',
                            fullname: 'user3',
                            imgUrl: '/img/img3.jpg',
                        },
                    },
                ],
                likedByUsers: ['user1', 'user4'],
            },
            {
                _id: 's103',
                name: 'Cozy Mountain Cabin',
                type: 'Cabin',
                imgUrls: ['https://img4.jpg', 'https://img5.jpg'],
                price: 95.0,
                summary: 'A warm and cozy cabin in the mountains...',
                capacity: 4,
                amenities: ['Fireplace', 'Kitchen', 'Hot Tub', 'Wifi'],
                labels: ['Nature', 'Relaxing', 'Adventure', 'Cozy'],
                host: {
                    _id: 'u105',
                    fullname: 'John Smith',
                    imgUrl: 'https://hostimg3.jpg',
                },
                loc: {
                    country: 'Canada',
                    countryCode: 'CA',
                    city: 'Banff',
                    address: '21 Mountain Trail',
                    lat: 51.1784,
                    lng: -115.5708,
                },
                reviews: [
                    {
                        id: 'r103',
                        txt: 'Perfect place for a weekend getaway!',
                        rate: 5,
                        by: {
                            _id: 'u106',
                            fullname: 'user5',
                            imgUrl: '/img/img5.jpg',
                        },
                    },
                ],
                likedByUsers: ['user2', 'user6'],
            },
            {
                _id: 's104',
                name: 'Urban Loft',
                type: 'Apartment',
                imgUrls: ['https://img6.jpg', 'https://img7.jpg'],
                price: 110.0,
                summary: 'Modern loft in the heart of the city...',
                capacity: 2,
                amenities: ['TV', 'Kitchen', 'Wifi', 'Air Conditioning'],
                labels: ['Urban', 'Trendy', 'Business', 'City Center'],
                host: {
                    _id: 'u107',
                    fullname: 'Emily Brown',
                    imgUrl: 'https://hostimg4.jpg',
                },
                loc: {
                    country: 'USA',
                    countryCode: 'US',
                    city: 'New York',
                    address: '45 Downtown St',
                    lat: 40.7128,
                    lng: -74.0060,
                },
                reviews: [
                    {
                        id: 'r104',
                        txt: 'Great location, perfect for work trips!',
                        rate: 4,
                        by: {
                            _id: 'u108',
                            fullname: 'user7',
                            imgUrl: '/img/img7.jpg',
                        },
                    },
                ],
                likedByUsers: ['user3', 'user8'],
            },
        ]
        saveToStorage(STORAGE_KEY, stays)
    }
}

