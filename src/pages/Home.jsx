import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

const Home = () => {
    const [IsLoading, setIsLoading] = useState(false);
    const [campaigns, setCamapigns] = useState([]);

    const { address, contract, getCampaigns } = useStateContext();

    const fetchCampigns = async () => {
        setIsLoading(true);
        const data = await getCampaigns();
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
        />
    )
}

export default Home