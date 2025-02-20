import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export function ResevationListing({ reserves }) {
  // Count how many times each address occurs
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
            label: { show: false },
            labelLine: { show: false }, // also hides the line for the label
          },
      ]}
      width={450}
      height={200}
      // Position the legend on the right
      legend={{
        position: 'right',
        itemGap: 20,
        labelStyle: {
          fontSize: 15,
        },
      }}
    />
  );
}
