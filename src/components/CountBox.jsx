import React from 'react'
import { darkTheme, lightTheme } from '../themes/theme'

const CountBox = ({ title, value, isDarkModeActive }) => {

    const theme = isDarkModeActive ? darkTheme : lightTheme;

    return (
        <div className="flex flex-col items-center w-[150px] rounded-[10px]">
            <div className={`w-full ${!isDarkModeActive ? 'shadow-lg shadow-cyan-500/50 rounded-[10px] border border-[#D9D9D9]' : ''}`}>
                <h4 className="font-epilogue font-bold text-[30px] p-3 rounded-t-[10px] w-full text-center truncate" style={{ backgroundColor: isDarkModeActive ? theme.backgroundCards : theme.backgroundCards, color: theme.titleColor, fontWeight: 'bold' }}>{value}</h4>
                <p className="font-epilogue font-normal text-[16px] px-3 py-2 w-full rounded-b-[10px] text-center" style={{ backgroundColor: isDarkModeActive ? '#28282E' : '#DADADA', color: theme.titleColor, fontWeight: "bold" }}>{title}</p>
            </div>
        </div>
    )
}

export default CountBox