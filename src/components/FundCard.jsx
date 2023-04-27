import React from 'react';
import { tagType, thirdweb } from '../assets';
import { daysLeft } from '../utils';
import { lightTheme, darkTheme } from "../themes/theme";

const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick, isDarkModeActive }) => {

    const remainingDays = daysLeft(deadline);

    const theme = isDarkModeActive ? darkTheme : lightTheme;

    return (
        <div className={`sm:w-[288px] w-full rounded-[15px] cursor-pointer ${!isDarkModeActive ? 'shadow-lg shadow-cyan-500/50 border border-[#D9D9D9]' : ''}`} style={{ backgroundColor: theme.backgroundCards }} onClick={handleClick}>
            <img src={image} alt="fund" className='w-full h-[158px] object-cover rounded-[15px]' />
            <div className='flex flex-col p-4'>
                <div className='flex flex-row items-center mb-[18px]'>
                    <img src={tagType} alt="tag" className='w-[17px] h-[17px] object-contain' />
                    <p className='ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]'>Technology</p>
                </div>
                <div className="block">
                    <h3 className='font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate' style={{ color: isDarkModeActive ? theme.titleColor : theme.titleColor, fontWeight: "bold", fontSize: "17px" }}>{title}</h3>
                    <p className='mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate' style={{ color: isDarkModeActive ? theme.textColor : theme.textColor }}>{description}</p>
                </div>
                <div className='flex justify-between flex-wrap mt-[15px] gap-2'>
                    <div className="flex flex-col">
                        <h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]' style={{ color: isDarkModeActive ? theme.textColor : theme.textColor }}>{amountCollected}</h4>
                        <p className='mt-[3px] font-epilogue font-normal text-[12px] text-[#808191] leading-[18px] sm:max-w-[120px] truncate' style={{ color: isDarkModeActive ? theme.titleColor : theme.titleColor, fontWeight: "bold" }}>Raised of {target}</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className='font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]' style={{ color: isDarkModeActive ? theme.textColor : theme.textColor }}>{remainingDays}</h4>
                        <p className='mt-[3px] font-epilogue font-normal text-[12px] text-[#808191] leading-[18px] sm:max-w-[120px] truncate' style={{ color: isDarkModeActive ? theme.titleColor : theme.titleColor, fontWeight: "bold" }}>Days Left</p>
                    </div>
                </div>
                <div className='flex items-center mt-[20px] gap-[12px]'>
                    <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
                        <img src={thirdweb} alt="user" className='w-1/2 h-1/2 object-contain' />
                    </div>
                    <p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'><span className='text-[#b2b3bd] ' style={{ color: isDarkModeActive ? theme.textColor : theme.textColor, fontWeight: "bold" }}>by {owner}</span></p>
                </div>
            </div>
        </div>
    )
}

export default FundCard