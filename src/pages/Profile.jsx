import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const Profile = ({ isDarkModeActive }) => {
    const [IsLoading, setIsLoading] = useState(false);
    const [campaigns, setCamapigns] = useState([]);

    const { address, contract, getUserCampaigns } = useStateContext();

    const fetchCampigns = async () => {
        setIsLoading(true);
        const data = await getUserCampaigns();
        setCamapigns(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchCampigns();
    }, [address, contract]);

    return (
        <DisplayCampaigns
            title="All Campaigns"
            IsLoading={IsLoading}
            campaigns={campaigns}
            isDarkModeActive={isDarkModeActive}
        />
    )
}

export default Profile