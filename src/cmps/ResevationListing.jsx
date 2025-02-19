import * as React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'

export function ResevationListing({ reserves }) {
    console.log(reserves)
    // ✅ Function to count listings
    const getListingCounts = (reserves) => {
        const listingCount = {}

        // Count occurrences of each listing
        reserves.forEach((reservation) => {
            if (listingCount[reservation.listing]) {
                listingCount[reservation.listing]++
            } else {
                listingCount[reservation.listing] = 1
            }
        })

        // Convert to chart format
        return Object.entries(listingCount).map(([label, value], index) => ({
            id: index,
            value,
            label,
        }))
    }

    const pieData = getListingCounts(reserves)

    return (
        <PieChart
            series={[{ data: pieData }]}
            width={450}
            height={180}
            legend={{
                itemGap: 20, 
                labelStyle: {
                    position: 'left', 
                    fontSize: 15, 
                },
            }}
        />
    );
}
