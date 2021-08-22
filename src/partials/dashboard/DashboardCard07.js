import React, { useState, useEffect } from 'react';

function DashboardCard07(data) {
  const [array, setArray] = useState({ players: [] });
  useEffect(() => {
    setArray(data);
  }, [data]);

  const setPtsAboveReplacementValue = (player) => {
    let value = 0;
    switch (player) {
      case 'QB':
        value = 317;
        break;
      case 'RB':
        value = 206;
        break;
      case 'WR':
        value = 252;
        break;
      case 'TE':
        value = 137;
        break;
    }
    return value;
  };

  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Top Players</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Player</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Position</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Total Points</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Auction Price</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Points Per Dollar
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Premium</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">PAR</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100">
              {array.players.map((player) => (
                <tr>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="text-gray-800">{player.name}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{player.position}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">{player.totalPoints}</div>
                  </td>

                  <td className="p-2">
                    <div
                      className={
                        'text-center ' +
                        (player.auctionPrice <= 30 && player.totalPoints >= 200
                          ? 'text-green-500'
                          : 'text-red-500')
                      }
                    >
                      {player.auctionPrice}
                    </div>
                  </td>
                  <td className="p-2">
                    <div
                      className={
                        'text-center ' +
                        (player.totalPoints / player.auctionPrice >= 20
                          ? 'text-green-500'
                          : 'text-red-500')
                      }
                    >
                      {(player.totalPoints / player.auctionPrice).toFixed(1)}
                    </div>
                  </td>
                  <td className="p-2">
                    <div
                      className={
                        'text-center ' +
                        (player.auctionPrice - player.otherLeagueDraftValue < 5
                          ? 'text-green-500'
                          : 'text-red-500')
                      }
                    >
                      {(
                        player.auctionPrice - player.otherLeagueDraftValue
                      ).toFixed(1)}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      {player.totalPoints -
                        setPtsAboveReplacementValue(player.position)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
