
import { storageService } from '../async-storage.service'
import { makeId, saveToStorage, loadFromStorage } from '../util.service'
import { userService } from '../user'
import data from '../../assets/data/stay.json'
// import airbnbImage from '../../assets/img/airbnb-image.jpg'
import image from '../../assets/img/image.avif'
import profile from '../../assets/img/profile.avif'

const STORAGE_KEY = 'stay'
_createStays()
export const stayService = {
    query,
    getById,
    save,
    remove,
    addStayMsg,
}
window.cs = stayService

async function query(filterBy = { where: '', checkIn: '', checkOut: '', guests: {}, type: '' }) {
    var stays = await storageService.query(STORAGE_KEY)
    const { where, guests, type } = filterBy

    if (where) {
        const regex = new RegExp(filterBy.where, 'i')
        stays = stays.filter(stay => regex.test(stay.loc.country))
    }

    if (guests) {
        stays = stays.filter(stay => stay.capacity >= guests.sum)
    }
    // if (minPrice) {
    //     stays = stays.filter(stay => stay.price >= minPrice)
    // }
    // if (sortField === 'type' || sortField === 'host') {
    //     stays.sort((stay1, stay2) =>
    //         stay1[sortField].localeCompare(stay2[sortField]) * +sortDir)
    // }
    // if (sortField === 'price' || sortField === 'price') {
    //     stays.sort((stay1, stay2) =>
    //         (stay1[sortField] - stay2[sortField]) * +sortDir)
    // }
    if (type && type !== 'No filter') {
        stays = stays.filter(stay => stay.type.includes(type))
    }

    // stays = stays.map(({ _id, type, price, host, imgUrls }) => ({ _id, type, price, host, imgUrls }))
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
        stays = data
        //     {
        //         _id: 's101',
        //         name: 'Ribeira Charming Duplex',
        //         type: 'House',
        //         imgUrls: [images[0]?.src, images[1]?.src, images[2]?.src, images[3]?.src, images[4]?.src],
        //         price: 80.0,
        //         summary: 'Fantastic duplex apartment...',
        //         capacity: 8,
        //         amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
        //         labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
        //         host: {
        //             _id: 'u101',
        //             fullname: 'Davit Pok',
        //             imgUrl: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739434710/airbnb-image_muycbi.jpg',
        //         },
        //         loc: {
        //             country: 'Portugal',
        //             countryCode: 'PT',
        //             city: 'Lisbon',
        //             address: '17 Kombo st',
        //             lat: -8.61308,
        //             lng: 41.1413,
        //         },
        //         reviews: [
        //             {
        //                 id: 'r101',
        //                 txt: 'Very helpful hosts. Cooked traditional...',
        //                 rate: 4,
        //                 by: {
        //                     _id: 'u102',
        //                     fullname: 'user2',
        //                     imgUrl: profile,
        //                 },
        //             },
        //         ],
        //         likedByUsers: ['mini-user'],
        //     },
        //     {
        //         _id: 's102',
        //         name: 'Ocean View Villa',
        //         type: 'Villa',
        //         imgUrls: [images[5]?.src, images[6]?.src, images[7]?.src, images[8]?.src, images[9]?.src],
        //         price: 150.0,
        //         summary: 'Luxury villa with breathtaking ocean views...',
        //         capacity: 6,
        //         amenities: ['Pool', 'Air Conditioning', 'Kitchen', 'Wifi'],
        //         labels: ['Luxury', 'Seaside', 'Romantic', 'Exclusive', 'Play'],
        //         host: {
        //             _id: 'u103',
        //             fullname: 'Maria Lopez',
        //             imgUrl: profile,
        //         },
        //         loc: {
        //             country: 'Spain',
        //             countryCode: 'ES',
        //             city: 'Barcelona',
        //             address: '12 Beachside Ave',
        //             lat: 41.3879,
        //             lng: 2.16992,
        //         },
        //         reviews: [
        //             {
        //                 id: 'r102',
        //                 txt: 'Amazing place, beautiful sunsets!',
        //                 rate: 5,
        //                 by: {
        //                     _id: 'u104',
        //                     fullname: 'user3',
        //                     imgUrl: profile,
        //                 },
        //             },
        //         ],
        //         likedByUsers: ['user1', 'user4'],
        //     },
        //     {
        //         _id: 's103',
        //         name: 'Cozy Mountain Cabin',
        //         type: 'Cabin',
        //         imgUrls: [images[10]?.src, images[11]?.src, images[12]?.src, images[13]?.src, images[14]?.src],
        //         price: 95.0,
        //         summary: 'A warm and cozy cabin in the mountains...',
        //         capacity: 4,
        //         amenities: ['Fireplace', 'Kitchen', 'Hot Tub', 'Wifi'],
        //         labels: ['Nature', 'Relaxing', 'Adventure', 'Cozy', 'Play'],
        //         host: {
        //             _id: 'u105',
        //             fullname: 'John Smith',
        //             imgUrl: profile,
        //         },
        //         loc: {
        //             country: 'Canada',
        //             countryCode: 'CA',
        //             city: 'Banff',
        //             address: '21 Mountain Trail',
        //             lat: 51.1784,
        //             lng: -115.5708,
        //         },
        //         reviews: [
        //             {
        //                 id: 'r103',
        //                 txt: 'Perfect place for a weekend getaway!',
        //                 rate: 5,
        //                 by: {
        //                     _id: 'u106',
        //                     fullname: 'user5',
        //                     imgUrl: profile,
        //                 },
        //             },
        //         ],
        //         likedByUsers: ['user2', 'user6'],
        //     },
        //     {
        //         _id: 's104',
        //         name: 'Urban Loft',
        //         type: 'Apartment',
        //         imgUrls: [images[15]?.src, images[16]?.src, images[17]?.src, images[18]?.src, images[19]?.src],
        //         price: 110.0,
        //         summary: 'Modern loft in the heart of the city...',
        //         capacity: 2,
        //         amenities: ['TV', 'Kitchen', 'Wifi', 'Air Conditioning'],
        //         labels: ['Urban', 'Trendy', 'Business', 'City Center', 'Play'],
        //         host: {
        //             _id: 'u107',
        //             fullname: 'Emily Brown',
        //             imgUrl: profile,
        //         },
        //         loc: {
        //             country: 'USA',
        //             countryCode: 'US',
        //             city: 'New York',
        //             address: '45 Downtown St',
        //             lat: 40.7128,
        //             lng: -74.0060,
        //         },
        //         reviews: [
        //             {
        //                 id: 'r104',
        //                 txt: 'Great location, perfect for work trips!',
        //                 rate: 4,
        //                 by: {
        //                     _id: 'u108',
        //                     fullname: 'user7',
        //                     imgUrl: profile,
        //                 },
        //             },
        //         ],
        //         likedByUsers: ['user3', 'user8'],
        //     },
        //     ...Array(14).fill().map((_, i) => ({
        //         _id: `s10${i + 5}`,
        //         name: `Stay ${i + 5}`,
        //         type: ['House', 'Villa', 'Cabin', 'Apartment'][i % 4],
        //         imgUrls: [image, image, image, image, image],
        //         price: (i + 5) * 10,
        //         summary: `Description of Stay ${i + 5}`,
        //         capacity: (i % 6) + 2,
        //         amenities: ['TV', 'Wifi', 'Kitchen', 'Air Conditioning'],
        //         labels: ['Luxury', 'Cozy', 'Urban', 'Nature'][i % 4],
        //         host: { _id: `u10${i + 5}`, fullname: `Host ${i + 5}`, imgUrl: profile },
        //         loc: { country: ['Portugal', 'Spain', 'Canada', 'USA'][i % 4], countryCode: ['PT', 'ES', 'CA', 'US'][i % 4], city: `City ${i + 5}`, address: `${i + 5} Main St`, lat: 40 + i, lng: -75 + i },
        //         reviews: [{ id: `r10${i + 5}`, txt: `Review for Stay ${i + 5}`, rate: (i % 5) + 1, by: { _id: `u10${i + 5}`, fullname: `Reviewer ${i + 5}`, imgUrl: profile } }],
        //         likedByUsers: [`user${i + 5}`],
        //     })),


        saveToStorage(STORAGE_KEY, stays)
    }
}

const images = [
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446282/asset_0_rshk8v.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446282/asset_4_ka2q4p.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446282/asset_2_ejbbq2.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446282/asset_1_b8rr7y.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446282/asset_3_z15unn.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446050/asset_3_qw2boi.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446051/asset_4_ulq3uz.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446051/asset_0_an9qtt.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446051/asset_1_ksuqll.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446052/asset_2_iih52p.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446368/asset_0_uwzhlb.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446369/asset_1_lnu3rs.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446369/asset_2_tpopbv.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446370/asset_3_tmvabw.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446372/asset_4_vvaheh.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446433/asset_0_lxilbu.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446434/asset_1_mml4ma.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446434/asset_2_kof2lw.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446435/asset_3_k4lly6.avif"
    },
    {
        src: "https://res.cloudinary.com/du312ufuo/image/upload/v1739446484/asset_4_bpiw6m.avif"
    }
]



