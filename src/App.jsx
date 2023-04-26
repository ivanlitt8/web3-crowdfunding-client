import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from './components'
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { lightTheme, darkTheme } from "./themes/theme";

const App = () => {

  const [isDarkModeActive, setIsDarkModeActive] = useState(true);

  const handleDarkModeClick = () => {
    setIsDarkModeActive(!isDarkModeActive);
  };

  const theme = isDarkModeActive ? darkTheme : lightTheme;

  return (
    <div className="relative sm:-8 p-4 flex flex-row min-h-screen" style={{ backgroundColor: theme.backgroundBody }}>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar
          handleDarkModeClick={handleDarkModeClick}
          isDarkModeActive={isDarkModeActive}
        />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar isDarkModeActive={isDarkModeActive} />
        <Routes>
          <Route path="/" element={<Home isDarkModeActive={isDarkModeActive} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;