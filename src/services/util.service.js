import { useEffect } from "react"
import { useState } from "react"

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    // console.log('data', data)
    return (data) ? JSON.parse(data) : undefined
}

export function calculateGradient(event, isHovering, setGradient) {
    if (!isHovering) setIsHovering(true)

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const xPos = ((event.clientX - left) / width) * 100
    const yPos = ((event.clientY - top) / height) * 100

    setGradient(`radial-gradient(circle at ${xPos}% ${yPos}%, rgb(255, 51, 102), #E61E6E)`)
}

export function resetGradient(setGradient) {
    setGradient("linear-gradient(90deg, #FF3366, #E61E6E)")
}

export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount)
};


export function useIsNarrowScreen() {
  // console.log(document.documentElement.clientWidth)
  const [isNarrow, setIsNarrow] = useState(document.documentElement.clientWidth < 768)
  useEffect(() => {
    if (typeof document === 'undefined') return // Ensure it's running in the browser

    const handleResize = () => {
      setIsNarrow(document.documentElement.clientWidth < 768)
    }

    window.addEventListener('resize', handleResize) // Listen for changes

    return () => window.removeEventListener('resize', handleResize) // Cleanup on unmount
  }, [])

  return isNarrow
}

// ✅ Format date range display (same format as original)
export function formatDateRange(checkinStr, checkoutStr) {
    if (checkinStr.includes('-')) {
        var [startYear, startMonth, startDay] = checkinStr.split('-')
        var [endYear, endMonth, endDay] = checkoutStr.split('-')
    } else {
        var [startMonth, startDay, startYear] = checkinStr.split('/')
        var [endMonth, endDay, endYear] = checkoutStr.split('/')
    }

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ]
    const monthName = months[Number(startMonth) - 1]

    return `${startDay}-${endDay} ${monthName} ${startYear}`
}

// ✅ Parse "YYYY-M-D" or "M/D/YYYY" to JavaScript Date
export function parseDate(dateStr) {
    if (dateStr.includes('-')) {
        const [year, month, day] = dateStr.split('-')
        return new Date(+year, +month - 1, +day)
    } else {
        const [month, day, year] = dateStr.split('/')
        return new Date(+year, +month - 1, +day)
    }
}

// ✅ Sort reservations: Pending first, then by checkout date (newest first)
export function sortByPendingFirst(reservations) {
    return [...reservations].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1
        if (b.status === 'pending' && a.status !== 'pending') return 1
        return new Date(b.checkout) - new Date(a.checkout)
    })
}


export const categories = [
    {
        name: 'Icons',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435597/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880_rjbyxy.webp'
    },
    {
        name: 'Amazing pools',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435591/3fb523a0-b622-4368-8142-b5e03df7549b_hzkvgu.png'
    },
    {
        name: 'Countryside',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437480/6ad4bd95-f086-437d-97e3-14d12155ddfe_ggjbap.png'
    },
    {
        name: 'Lakefront',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435550/677a041d-7264-4c45-bb72-52bff21eb6e8_qswiv8.png'
    },
    {
        name: 'Cabin',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435613/732edad8-3ae0-49a8-a451-29a8010dcc0c_t8qlze.png'
    },

    {
        name: 'Surfing',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435540/957f8022-dfd7-426c-99fd-77ed792f6d7a_wlbwvq.png'
    },
    {
        name: 'Creative spaces',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437334/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622_rnr3ce.png'
    },
    {
        name: 'OMG!',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435558/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6_ojaa0j.png'
    },
    {
        name: 'Castles',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435574/1b6a8b70-a3b6-48b5-88e1-2243d9172c06_swyjgt.png'
    },
    {
        name: 'Beachfront',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435436/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c_dzxjjn.png'
    },
    {
        name: 'Mansions',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437423/78ba8486-6ba6-4a43-a56d-f556189193da_hlrdrx.png'
    },
    {
        name: 'Amazing views',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739435584/3b1eb541-46d9-4bef-abc4-c37d77e3c21b_m5mzlv.png'
    },
    {
        name: 'Islands',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437538/8e507f16-4943-4be9-b707-59bd38d56309_lqpm0x.png'
    },
    {
        name: 'Design',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437569/50861fca-582c-4bcc-89d3-857fb7ca6528_qd1u69.png'
    },
    {
        name: 'Off-the-grid',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437589/9a2ca4df-ee90-4063-b15d-0de7e4ce210a_uhmtd2.png'
    },
    {
        name: 'Farms',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437617/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd_wzatin.png'
    },
    {
        name: 'Trending',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437652/3726d94b-534a-42b8-bca0-a0304d912260_r0wvjg.png'
    },
    {
        name: 'Treehouses',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437690/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e_vooz9a.png'
    },
    {
        name: 'Luxe',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437747/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4_gwuj42.png'
    },
    {
        name: 'Top cities',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437821/ed8b9e47-609b-44c2-9768-33e6a22eccb2_u5agje.png'
    },
    {
        name: 'Tiny homes',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437853/3271df99-f071-4ecf-9128-eb2d2b1f50f0_cx0n8k.png'
    },
    {
        name: 'Tropical',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437885/ee9e2a40-ffac-4db9-9080-b351efc3cfc4_ra2t6k.png'
    },
    {
        name: 'Top of the world',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437916/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4_kghfgs.png'
    },
    {
        name: 'Boats',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437955/687a8682-68b3-4f21-8d71-3c3aef6c1110_wbxxue.png'
    },
    {
        name: 'Historical homes',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739437981/33dd714a-7b4a-4654-aaf0-f58ea887a688_k3tos5.png'
    },
    {
        name: 'Play',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739438617/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf_qpnvjh.png'
    },
    {
        name: 'Earth homes',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739438692/d7445031-62c4-46d0-91c3-4f29f9790f7a_nihnsj.png'
    },
    {
        name: 'Ski-in/out',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739438727/757deeaa-c78f-488f-992b-d3b1ecc06fc9_jirram.png'
    },
    {
        name: 'National parks',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739439473/c0a24c04-ce1f-490c-833f-987613930eca_x4u3oq.png'
    },
    {
        name: 'Houseboats',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739439700/c027ff1a-b89c-4331-ae04-f8dee1cdc287_jflkti.png'
    },
    {
        name: 'Desert',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739439727/a6dd2bae-5fd0-4b28-b123-206783b5de1d_fbvc39.png'
    },
    {
        name: 'A-frames',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739439753/1d477273-96d6-4819-9bda-9085f809dad3_bb3xzl.png'
    },
    {
        name: 'Rooms',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739439757/7630c83f-96a8-4232-9a10-0398661e2e6f_ibsq2i.png'
    },
    {
        name: 'Vineyards',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739439950/60ff02ae-d4a2-4d18-a120-0dd274a95925_rbkzj6.png'
    },
    {
        name: 'Arctic',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739439968/8b44f770-7156-4c7b-b4d3-d92549c8652f_oic8tr.png'
    },
    {
        name: 'Caves',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440005/4221e293-4770-4ea8-a4fa-9972158d4004_w16fb3.png'
    },
    {
        name: 'Domes',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440024/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca_cy1s0p.png'
    },
    {
        name: 'Camping',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440042/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770_vivlv2.png'
    },
    {
        name: 'Bed & breakfast',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440059/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325_vkwdmp.png'
    },
    {
        name: 'Towers',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440082/d721318f-4752-417d-b4fa-77da3cbc3269_nos2gm.png'
    },
    {
        name: 'Containers',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440145/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6_nxjooo.png'
    },
    {
        name: 'Skiing',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440167/c8bba3ed-34c0-464a-8e6e-27574d20e4d2_ets9p7.png'
    },
    {
        name: 'Windmills',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440186/5cdb8451-8f75-4c5f-a17d-33ee228e3db8_t9qn0a.png'
    },
    {
        name: 'Dammusi',
        src: 'https://res.cloudinary.com/dswenk4wc/image/upload/v1739440205/c9157d0a-98fe-4516-af81-44022118fbc7_de4ofg.png'
    },
]