import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo, sun } from '../assets';
import { navlinks } from '../constants';
import { lightTheme, darkTheme } from "../themes/theme";


const Sidebar = ({ handleDarkModeClick }) => {

    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const [isDarkModeActive, setIsDarkModeActive] = useState(true);

    const handleClick = () => {
        setIsDarkModeActive(!isDarkModeActive);
        setIsActive('darkMode'); // opcional, para activar un ícono de "modo oscuro" en la barra lateral
        handleDarkModeClick(!isDarkModeActive);
        console.log("DarkModeActivado", !isDarkModeActive)
    }

    const theme = isDarkModeActive ? darkTheme : lightTheme;

    const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
        <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name ? `bg-${theme.selectedColor}` : ''} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
            {!isActive ? (
                <img src={imgUrl} alt="fund_logo" className='w-1/2 h-1/2' />
            ) : (
                <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
            )}
        </div>
    )

    return (
        <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
            <Link to="/" className={`rounded-[10px] ${!isDarkModeActive ? 'drop-shadow-md border border-[#D9D9D9]' : 'bg-[#1C1C24]'}`}>
                <Icon styles="w-[52px] h-[52px]" style={{ backgroundColor: isDarkModeActive ? theme.backgroundCards : theme.backgroundCards }} imgUrl={logo} />
            </Link>
            <div className={`flex-1 flex flex-col justify-between items-center rounded-[20px] w-[76px] py-4 mt-12 ${!isDarkModeActive ? 'shadow-lg shadow-cyan-500/50' : ''}`} style={{ backgroundColor: theme.backgroundCards }}>
                <div className='flex flex-col justify-center items-center gap-3'>
                    {navlinks.map((link) => (
                        <Icon key={link.name} {...link} isActive={isActive} handleClick={() => {
                            if (!link.disabled) {
                                setIsActive(link.name);
                                navigate(link.link)
                            }
                        }} />
                    ))}
                </div>
                <Icon
                    styles={`bg-[#1c1c24] shadow-secondary ${!isDarkModeActive ? 'bg-[#DCD5D5] shadow-inner' : ''} ${!isDarkModeActive && 'cursor-pointer'}`}
                    imgUrl={sun}
                    handleClick={handleClick}
                    isActive={isDarkModeActive}
                    isDarkModeActive={isDarkModeActive}
                />
            </div>
        </div>
    );
};

export default Sidebar