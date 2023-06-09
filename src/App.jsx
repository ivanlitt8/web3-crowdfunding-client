import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar, SearchResults } from './components'
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { lightTheme, darkTheme } from "./themes/theme";

const App = () => {

  const [isDarkModeActive, setIsDarkModeActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDarkModeClick = () => {
    setIsDarkModeActive(!isDarkModeActive);
  };

  const handleSearchQueryElevation = (query) => {
    setSearchQuery(query);
  };



  const theme = isDarkModeActive ? darkTheme : lightTheme;

  return (
    <div className="relative sm:-8 p-4 flex flex-row min-h-screen" style={{ backgroundColor: theme.backgroundBody }}>
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar
          handleDarkModeClick={handleDarkModeClick}
          isDarkModeActive={isDarkModeActive}
          setIsDarkModeActive={setIsDarkModeActive}
        />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar isDarkModeActive={isDarkModeActive} handleDarkModeClick={handleDarkModeClick} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchQueryLocalElevation={handleSearchQueryElevation} />
        <Routes>
          <Route path="/" element={<Home isDarkModeActive={isDarkModeActive} />} />
          <Route path="/profile" element={<Profile isDarkModeActive={isDarkModeActive} />} />
          <Route path="/create-campaign" element={<CreateCampaign isDarkModeActive={isDarkModeActive} />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails isDarkModeActive={isDarkModeActive} />} />
          <Route path="/search-results" element={<SearchResults isDarkModeActive={isDarkModeActive} searchQuery={searchQuery} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;