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


export function RevenewMonth({reserves}) {
    const getLast12Months = () => {
        const months = []
        const currentDate = new Date()
    
        for (let i = 11;i >= 0;i--) {
            const date = new Date()
            date.setMonth(currentDate.getMonth() - i)
            months.push(date.toLocaleString('default', { month: 'long' })) // 'January', 'February', etc.
        }
    
        return months
    }
    
    const labels = getLast12Months()

// ✅ Initialize revenue data for each month
    const revenueByMonth = labels.reduce((acc, month) => {
        acc[month] = 0
        return acc
    }, {})

    // ✅ Process reservations to accumulate revenue per month
    reserves.forEach((reservation) => {
        if (!reservation.checkout) return

        const checkoutDate = new Date(reservation.checkout)
        const monthName = checkoutDate.toLocaleString('default', { month: 'long' })

        if (revenueByMonth[monthName] !== undefined) {
            const price = parseFloat(reservation.totalPrice.replace(/[^0-9.]/g, ''))
            revenueByMonth[monthName] += isNaN(price) ? 0 : price
        }
    })

    // ✅ Prepare dataset
    const data = {
        labels,
        datasets: [
            {
                label: 'Total Revenue',
                data: labels.map(month => revenueByMonth[month]), // Get revenue values in correct order
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }
    return (
        <div style={{ width: '402px', height: '180px' }}>
            <Bar options={options} data={data} />
        </div>
    )

}
