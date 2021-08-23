import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import Transition from '../utils/Transition.js';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import BasePlayers from '../basePlayers.json';
export default function Players() {
  const [data, setData] = useState({ players: [] });
  const [initial, setInitialState] = useState({ players: [] });
  const [pts, setPts] = useState(0);
  const [pos, setPos] = useState('');
  const [price, setPrice] = useState(0);
  const [ppd, setPpd] = useState(0);
  const [par, setPar] = useState(0);
  const localhost = 'http://localhost:5000';
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const basePlayers = {
    players: BasePlayers,
  };

  const devPlayers = {
    players: [
      {
        name: 'Josh Allen',
        position: 'QB',
        auctionPrice: 11,
        totalPoints: 418.0,
        average: 26.125,
        bio: "Allen is the perfect example of why rushing is so important when it comes to QB fantasy evaluations. The 2018 first-round pick finished as fantasy's No. 6 QB last season despite ranking 23rd in passing yards, 21st with only 20 passing TDs, third worst in completion percentage (59%) and 11th worst in YPA (6.7). Of course, Allen also produced a 109-510-9 rushing line and has now paced the position in rushing TDs in each of his two NFL seasons (17 total). Allen's passing troubles remain a red flag, but the addition of Stefon Diggs should help his cause. As long as he keeps running, Allen will be a back-end QB1 option.",
        otherLeagueDraftValue: 8.93,
      },
    ],
  };
  useEffect(() => {
    async function fetchAxios() {
      const result = await axios(`${localhost}/players`);
      result.data.players.sort(compare);
      setData(result.data);
      setInitialState(result.data);
    }
    fetchAxios();
    if (data.players.length === 0) {
      basePlayers.players.sort(compare);
      setData(basePlayers);
      setInitialState(basePlayers);
    }
  }, []);

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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (initial !== data) {
      setData(initial);
    }
    filterPlayersByForm(pos, pts, price, ppd, par);
  };

  const resetCards = (event) => {
    event.preventDefault();
    setData(initial);
    setPts(0);
    setPpd(0);
    setPar(0);
    setPrice(0);
    setPos('ALL');
  };

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
      default:
        value = 0;
    }
    return value;
  };

  const filterPlayersByForm = (pos, points, price, ppd) => {
    let filterArray = initial;

    if (pos === '') {
      pos = 'ALL';
    }
    if (points === '') {
      points = 0;
    }
    if (price === '') {
      price = 0;
    }
    if (ppd === '') {
      ppd = 0;
    }
    if (par === '') {
      par = 0;
    }
    let filterResult = { players: [] };

    if (pos === 'ALL') {
      filterResult.players = filterArray.players.filter(
        (player) =>
          player.totalPoints >= points &&
          player.auctionPrice >= price &&
          player.totalPoints - par >=
            setPtsAboveReplacementValue(player.position) &&
          player.totalPoints / player.auctionPrice >= ppd
      );
    } else {
      filterResult.players = filterArray.players.filter(
        (player) =>
          player.position === pos &&
          player.totalPoints >= points &&
          player.auctionPrice >= price &&
          player.totalPoints - par >=
            setPtsAboveReplacementValue(player.position) &&
          player.totalPoints / player.auctionPrice >= ppd
      );
    }
    setData(filterResult);
  };

  const isLoading = data.players.length > 15;

  return (
    <div>
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2 mb-5">
        <div className="relative inline-flex">
          <button
            ref={trigger}
            className="btn bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600 w-50"
            aria-haspopup="true"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <span className="sr-only">Filter</span>
            <wbr />
            Filters
            <svg className=" ml-4 w-4 h-4 fill-current" viewBox="0 0 16 16">
              <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
            </svg>
          </button>
          <Transition
            show={dropdownOpen}
            tag="div"
            className="origin-top-right z-10 absolute top-full left-0 right-auto md:left-auto md:right-0 min-w-56 bg-white border border-gray-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1"
            enter="transition ease-out duration-200 transform"
            enterStart="opacity-0 -translate-y-2"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
          >
            <div ref={dropdown}>
              <div className="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">
                Filters
              </div>

              <div>
                <form onSubmit={handleSubmit}>
                  <label className="ml-5">
                    Points:
                    <input
                      className="py-3 px-4 mr-5 ml-5 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
                      type="number"
                      name="points"
                      value={pts}
                      onChange={(e) => setPts(e.target.value)}
                    />
                  </label>
                  <label className="ml-5">
                    Auction Price:
                    <input
                      className="py-3 px-4 mr-5 ml-5 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
                      type="number"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </label>
                  <label className="ml-5">
                    Pts Per Dollar:
                    <input
                      className="py-3 px-4 mr-5 ml-5 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
                      type="number"
                      name="ppd"
                      value={ppd}
                      onChange={(e) => setPpd(e.target.value)}
                    />
                  </label>
                  <label className="ml-5">
                    Pts Above Replacement:
                    <input
                      className="py-3 px-4 mr-5 ml-5 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
                      type="number"
                      name="par"
                      value={par}
                      onChange={(e) => setPar(e.target.value)}
                    />
                  </label>
                  <label className="ml-5">
                    Position:
                    <select
                      className="py-3 px-10 px-4 mr-5 ml-5 bg-white placeholder-gray-400 text-gray-900 rounded-lg shadow-md appearance-none block focus:outline-none"
                      type="text"
                      name="position"
                      value={pos}
                      onChange={(e) => setPos(e.target.value)}
                    >
                      <option value="ALL">All Players</option>
                      <option value="QB">QB</option>
                      <option value="RB">RB</option>
                      <option value="WR">WR</option>
                      <option value="TE">TE</option>
                    </select>
                  </label>
                  <div className="py-2 px-3 border-t border-gray-200 bg-gray-50 mt-5">
                    <ul className="flex items-center justify-between">
                      <li>
                        <button
                          type="submit"
                          className="btn-xs bg-white border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-600"
                          onClick={(e) => resetCards(e)}
                        >
                          Clear
                        </button>
                      </li>
                      <li>
                        <button
                          type="submit"
                          className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                          onClick={() => setDropdownOpen(false)}
                          onBlur={() => setDropdownOpen(false)}
                        >
                          Apply
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {isLoading ? (
          <DashboardCard07 players={data.players} />
        ) : (
          data.players.map((player) => (
            <DashboardCard04
              key={player._id}
              name={player.name}
              totalPoints={player.totalPoints}
              auctionPrice={player.auctionPrice}
              otherLeagueDraftValue={player.otherLeagueDraftValue}
              par={player.totalPoints - setPtsAboveReplacementValue(player.position)}
            />
          ))
        )}
      </div>
    </div>
  );
}
