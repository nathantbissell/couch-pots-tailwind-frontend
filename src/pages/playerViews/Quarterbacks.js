import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardCard04 from '../../partials/dashboard/DashboardCard04';

export default function Players() {
  const [data, setData] = useState({ players: [] });
  const localhost = 'http://localhost:5000';

  // const basePlayers = {
  //   players: [
  //     {
  //       name: 'Josh Allen',
  //       position: 'QB',
  //       auctionPrice: 11,
  //       totalPoints: 418.0,
  //       average: 26.125,
  //       bio: "Allen is the perfect example of why rushing is so important when it comes to QB fantasy evaluations. The 2018 first-round pick finished as fantasy's No. 6 QB last season despite ranking 23rd in passing yards, 21st with only 20 passing TDs, third worst in completion percentage (59%) and 11th worst in YPA (6.7). Of course, Allen also produced a 109-510-9 rushing line and has now paced the position in rushing TDs in each of his two NFL seasons (17 total). Allen's passing troubles remain a red flag, but the addition of Stefon Diggs should help his cause. As long as he keeps running, Allen will be a back-end QB1 option.",
  //       otherLeagueDraftValue: 8.93,
  //     },
  //     {
  //       name: 'Aaron Rodgers',
  //       position: 'QB',
  //       auctionPrice: 15,
  //       totalPoints: 394.0,
  //       average: 24.625,
  //       bio: "Once a perennial top-two fantasy QB, Rodgers has settled in as more of a mid-to-back-end QB1 in recent seasons. That included 2019, which saw him finish ninth in fantasy points even though he appeared in all 16 games and ranked eighth in pass attempts. Rodgers' efficiency has been a culprit, as he hasn't finished better than 16th in YPA since 2014 after previously dominating the category. He also hasn't cleared 26 pass TDs in a season since 2016 and is no longer much of a factor with his legs. Rodgers has Davante Adams, Aaron Jones and a solid line at his disposal, but the 36-year-old is no longer an elite fantasy weapon.",
  //       otherLeagueDraftValue: 5.36,
  //     },
  //   ],
  // };
  useEffect(() => {
    async function fetchAxios() {
      const result = await axios(`${localhost}/players`);
      setData(result.data);
    }
    fetchAxios();
    // if (data.players.length === 0) {
    //   setData(basePlayers);
    // }
  }, []);

  const getPlayersByFilter = (pos, points) => {
    let result = [];
    if (pos === '') {
      result = data.players.filter((player) => player.totalPoints > points);
    } else if (points === 0) {
      result = data.players.filter((player) => (player.position = pos));
    } else {
      result = data.players.filter(
        (player) => player.totalPoints > points && player.position === pos
      );
    }

    return result;
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {getPlayersByFilter('QB', 100).map((filteredPlayer) => (
        <DashboardCard04
          name={filteredPlayer.name}
          totalPoints={filteredPlayer.totalPoints}
          auctionPrice={filteredPlayer.auctionPrice}
          otherLeagueDraftValue={filteredPlayer.otherLeagueDraftValue}
        />
      ))}
    </div>
  );
}
