import React from 'react';
import DisplayCampaigns from './DisplayCampaigns';

const SearchResults = ({ searchQuery, campaigns, isDarkModeActive }) => {

    console.log('searchQuery:', searchQuery);

    const filteredCampaigns = campaigns.filter((campaign) => campaign.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <DisplayCampaigns
            title={`Search Results for "${searchQuery}"`}
            isLoading={false}
            campaigns={filteredCampaigns}
            isDarkModeActive={isDarkModeActive}
        />
    );
};

export default SearchResults;
