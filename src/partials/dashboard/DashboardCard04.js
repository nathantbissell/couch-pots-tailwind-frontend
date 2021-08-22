import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04(props) {
  const { name, auctionPrice, totalPoints, otherLeagueDraftValue } = props;
  const chartData = {
    labels: ['20'],
    datasets: [
      // Light blue bars
      {
        label: 'Auction Price',
        data: [auctionPrice],
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Points Per Dollar',
        data: [totalPoints / auctionPrice],
        backgroundColor: tailwindConfig().theme.colors.green[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        label: 'Couch Pots Premium Price',
        data: [auctionPrice - otherLeagueDraftValue],
        backgroundColor: tailwindConfig().theme.colors.yellow[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="flex items-start mt-5 ml-5">
        <div className="text-3xl font-bold text-gray-800 ml-3">{name}</div>
        <div className="text-lg font-semibold text-white px-5 bg-green-500 mt-2 ml-20">
          {totalPoints} pts
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
