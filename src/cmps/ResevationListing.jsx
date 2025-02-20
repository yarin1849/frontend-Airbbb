import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export function ResevationListing({ reserves }) {
    // 1) Gather chart data
    const getListingCounts = (res) => {
        const listingCount = {};
        res.forEach((reservation) => {
            const address = reservation.location.address;
            listingCount[address] = (listingCount[address] || 0) + 1;
        });
        return Object.entries(listingCount).map(([label, value], id) => ({ id, value, label }));
    };

    const pieData = getListingCounts(reserves);

    return (
        <PieChart
        series={[
          {
            data: pieData,
            showLabels: false,
          },
        ]}
        // width={600}
        height={200}
        legend={{
            itemGap: 2, 
            labelStyle: { fontSize: 14 },
          }}
      />
    );
}


