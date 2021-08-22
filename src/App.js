import React, { useEffect, useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import './css/style.scss';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';
import Sidebar from './partials/Sidebar';
import WelcomeBanner from './partials/dashboard/WelcomeBanner';
import FilterButton from './partials/actions/FilterButton';

// Import pages
import Dashboard from './pages/Dashboard';
import Players from './pages/playerViews/Players';
import Quarterbacks from './pages/playerViews/Quarterbacks';
import Runningbacks from './pages/playerViews/Runningbacks';
import WideReceivers from './pages/playerViews/WideReceivers';
import TightEnds from './pages/playerViews/TightEnds';

function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Welcome banner */}
              <WelcomeBanner />

              {/* Cards */}
              <Switch>
                <Route exact path="/">
                  <Players />
                </Route>
                <Route exact path="/qb">
                  <Quarterbacks />
                </Route>
                <Route exact path="/rb">
                  <Runningbacks />
                </Route>
                <Route exact path="/wr">
                  <WideReceivers />
                </Route>
                <Route exact path="/te">
                  <TightEnds />
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
