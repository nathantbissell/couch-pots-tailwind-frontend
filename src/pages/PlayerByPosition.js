import React, { useState, useEffect } from 'react';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import BasePlayers from '../basePlayers.json';
export default function PlayerByPosition(props) {
  const [data, setData] = useState({ players: [] });

  const basePlayers = {
    players: BasePlayers,
  };

  useEffect(() => {
    let filterResult = { players: [] };
    filterResult.players = basePlayers.players.filter(
      (player) => player.totalPoints > 50 && player.position === props.pos
    );
    filterResult.players.sort(compare);
    setData(filterResult);
  }, [props]);

  function compare(a, b) {
    const first = a.totalPoints;
    const second = b.totalPoints;

    let comparison = 0;
    if (first > second) {
      comparison = -1;
    } else if (first < second) {
      comparison = 1;
    }
    return comparison;
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <DashboardCard07 players={data.players} />
    </div>
  );
}
