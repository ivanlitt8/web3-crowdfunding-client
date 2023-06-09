import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from './';
import { newLogo, menu, sun, search, thirdweb } from '../assets';
import { navlinks, logoutLink } from '../constants';
import { useStateContext } from '../context';
import { lightTheme, darkTheme } from "../themes/theme";

const Navbar = ({ isDarkModeActive, handleDarkModeClick, searchQuery, setSearchQuery, handleSearchQueryLocalElevation }) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const { connect, address, disconnect } = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearchQueryLocalElevation(searchQuery);
        setSearchQuery(searchQuery); // Actualiza el estado en App.jsx
        navigate(`/search-results?query=${searchQuery}`); // Cambia la URL
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchFormSubmitted(true); // Establece el estado para indicar que el formulario ha sido enviado
    };

    const handleLogoutClick = async () => {
        await disconnect();
        navigate(logoutLink[0].link);
    };


    const handleClick = () => {
        setIsDarkModeActive(!isDarkModeActive);
        setIsActive('darkMode');
        handleDarkModeClick(!isDarkModeActive);
    }


    const theme = isDarkModeActive ? darkTheme : lightTheme;

    return (
        <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
            <div className={`lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 h-[52px] rounded-[100px] ${!isDarkModeActive ? 'drop-shadow-md border border-[#D9D9D9]' : ''}`} style={{ backgroundColor: theme.backgroundCards }}>
                <input type="text" placeholder=' Search for campaigns' className={`flex w-full font-epiloge font-normal text-[14px] placeholder:text-[#4b5264] bg-transparent outline-none ${!isDarkModeActive ? 'text-[#1a1a1a]' : 'text-white'
                    }`}
                    value={searchQuery}
                    onChange={handleSearchQueryChange} />
                <div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer mr-2' onClick={handleSubmit}>
                    <img src={search} alt="search" className='w-[15px] h-[15px] object-contain' />
                </div>
            </div>
            <div className="sm:flex hidden flex-row justify-end gap-4">
                <CustomButton btnType="button"
                    title={address ? 'Create a campaign' : 'Connect'}
                    styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={() => {
                        if (address) navigate('create-campaign')
                        else connect();
                    }}
                />
                <Link to="/profile">
                    <div className={`w-[52px] h-[52px] rounded-full flex justify-center items-center cursor-pointer' ${!isDarkModeActive ? 'drop-shadow-md border border-[#D9D9D9]' : 'bg-[#1C1C24]'}`}>
                        <img src={thirdweb} alt="user" className='w-[60%] h-[60%] object-contain' />
                    </div>
                </Link>
            </div>

            {/* Small screen navigation */}
            <div className="sm:hidden flex justify-between relative items-center">
                <Link to="/">
                    <div className={`w-[40px] h-[40px] rounded-[10px] flex justify-center items-center cursor-pointer' ${!isDarkModeActive ? 'drop-shadow-md border border-[#D9D9D9]' : 'bg-[#1C1C24]'}`}>
                        <img src={newLogo} alt="user" className='w-[60%] h-[60%] object-contain' />
                    </div>
                </Link>
                <img src={menu} alt="menu" className='w-[34px] h-[34px] object-contain cursor-pointer' onClick={() => setToggleDrawer((prev) => !prev)} />
                <div className={`absolute top-[60px] rounded-[10px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700 ${!isDarkModeActive ? 'shadow-lg border border-[#D9D9D9]' : ''}`} style={{ backgroundColor: theme.backgroundCards }}>
                    <ul className="mb-4">
                        {navlinks.map((link) => (
                            <li key={link.name} className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`} onClick={() => {
                                setIsActive(link.name);
                                setToggleDrawer(false);
                                navigate(link.link);
                            }}>
                                <img src={link.imgUrl} alt={link.name} className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`} />
                                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                                    {link.name}
                                </p>
                            </li>
                        ))}
                        <li key={logoutLink[0].name} className='flex p-4' onClick={handleLogoutClick}>
                            <img src={logoutLink[0].imgUrl} alt={logoutLink[0].name} className={`w-[24px] h-[24px] object-contain ${isActive === logoutLink[0].name ? 'grayscale-0' : 'grayscale'}`} />
                            <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === logoutLink[0].name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                                {logoutLink[0].name}
                            </p>
                        </li>
                        <li className='flex p-4' onClick={handleDarkModeClick}>
                            <img src={sun} alt="sun" />
                            <p
                                className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === logoutLink[0].name ? 'text-[#1dc071]' : 'text-[#808191]'
                                    }`}
                            >
                                theme
                            </p>
                        </li>
                    </ul>
                    <div className="flex mx-4">
                        <CustomButton btnType="button"
                            title={address ? 'Create a campaign' : 'Connect'}
                            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                            handleClick={() => {
                                if (address) {
                                    navigate('create-campaign')
                                } else {
                                    connect();
                                }
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar