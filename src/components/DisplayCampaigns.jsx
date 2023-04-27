import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import { FundCard } from '../components';

const DisplayCampaigns = ({ title, isLoading, campaigns, isDarkModeActive }) => {

    const navigate = useNavigate();

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign, isDarkModeActive });
    }

    return (
        <div>
            <h1 className='font-epilogue font-semibold text-[18px] text-left' style={{ color: isDarkModeActive ? '#FFFFFF' : '#13131A', fontWeight: "bold" }}>{title} ({campaigns.length})</h1>
            <div className='flex flex-wrap mt-[20px] gap-[26px]'>
                {isLoading && (
                    <img src={loader} alt="loader" className='w-[100px] h-[100px] object-contain' />
                )}

                {!isLoading && campaigns.length === 0 && (
                    <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
                        You have not created any campaigns yet.
                    </p>
                )}

                {!isLoading && campaigns.length > 0 && campaigns.map((campaign, i) =>
                    <FundCard
                        key={i}
                        {...campaign}
                        handleClick={() => handleNavigate(campaign)}
                        isDarkModeActive={isDarkModeActive}
                    />)}
            </div>
        </div>
    )
}

export default DisplayCampaigns