import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
}

// ✅ Function to format date range
function formatDateRange(checkinStr, checkoutStr) {
    if (checkinStr.split('/').length === 1) {
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
    const monthName = months[Number(startMonth) - 1] // e.g. "5" => "May"

    return `${startDay}-${endDay} ${monthName} ${startYear}`
}

// ✅ Function to parse a date string into a JavaScript Date object
function parseDate(dateStr) {
    if (!dateStr) return NaN // Handle null or undefined values

    if (dateStr.includes('/')) {
        const [month, day, year] = dateStr.split('/')
        return new Date(Number(year), Number(month) - 1, Number(day))
    } else {
        const [year, month, day] = dateStr.split('-')
        return new Date(Number(year), Number(month) - 1, Number(day))
    }
}

// ✅ Function to get the last 12 months as numeric indices
const getLast12Months = () => {
    const months = []
    const currentDate = new Date()
    
    for (let i = 0; i < 12; i++) {
        const date = new Date(currentDate.getFullYear(), i, 1) // Use fixed year and month order
        months.push(date.getMonth()) // Store as month index (0 = Jan, ..., 11 = Dec)
    }

    return months
}

export function RevenewMonth({ reserves }) {
    // Get last 12 months as labels
    const labels = getLast12Months().map(monthIndex =>
        new Date(2023, monthIndex, 1).toLocaleString('default', { month: 'long' })
    )

    // ✅ Initialize revenue storage using month indices (0-11)
    const revenueByMonth = getLast12Months().reduce((acc, monthIndex) => {
        acc[monthIndex] = 0
        return acc
    }, {})

    // ✅ Process reservations to accumulate revenue per month
    reserves.forEach((reservation) => {
        if (!reservation.checkout) return

        // Parse checkout date correctly
        const checkoutDate = parseDate(reservation.checkout)
        if (isNaN(checkoutDate)) {
            console.error("Invalid checkout date:", reservation.checkout)
            return
        }

        const monthIndex = checkoutDate.getMonth() // Get month index (0-11)

        console.log(`Processing: ${reservation.checkout} -> Month Index: ${monthIndex}`) // Debugging

        if (revenueByMonth.hasOwnProperty(monthIndex)) {
            const price = reservation.price
            revenueByMonth[monthIndex] += isNaN(price) ? 0 : price
        } else {
            console.warn(`Skipping month index: ${monthIndex} (not found in labels)`)
        }
    })

    // ✅ Prepare dataset
    const data = {
        labels, // Display labels remain as month names
        datasets: [
            {
                label: 'Total Revenue',
                data: getLast12Months().map(monthIndex => revenueByMonth[monthIndex] || 0), // Map using correct indices
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    return (
        <div style={{ height: '200px' }}>
            <Bar options={options} data={data} />
        </div>
    )
}
