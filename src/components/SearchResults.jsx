import React, { useState, useEffect } from 'react';
import DisplayCampaigns from './DisplayCampaigns';
import { useStateContext } from '../context';


const SearchResults = ({ isDarkModeActive, searchQuery }) => {


    const [IsLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const { contract, getCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
        setIsLoading(false);
        const filteredCampaigns = data.filter((campaign) => {
            const campaignTitle = campaign.title.toLowerCase();
            const searchQueryLowercase = searchQuery.toLowerCase();
            return campaignTitle.includes(searchQueryLowercase);
        });
        setCampaigns(filteredCampaigns);

    };


    useEffect(() => {
        if (contract) fetchCampaigns();
    }, [searchQuery, contract]);

    return (
        <DisplayCampaigns
            title="Resultados"
            IsLoading={IsLoading}
            campaigns={campaigns}
            isDarkModeActive={isDarkModeActive}
        />
    )
};

export default SearchResults;
