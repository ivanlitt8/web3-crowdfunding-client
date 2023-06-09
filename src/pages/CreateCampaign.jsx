import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from '../context';
import { darkTheme, lightTheme } from '../themes/theme';

const CreateCampaign = ({ isDarkModeActive }) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { createCampaign } = useStateContext();
    const [form, setForm] = useState({
        name: '',
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: ''
    });

    const theme = isDarkModeActive ? darkTheme : lightTheme;

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        checkIfImage(form.image, async (exists) => {
            if (exists) {
                setIsLoading(true);
                console.log(form);
                await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
                setIsLoading(false);
                navigate('/');
            } else {
                alert('Provide valid image URL')
                setForm({ ...form, image: '' });
            }
        })
    }

    return (
        <div className={`flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 ${!isDarkModeActive ? 'drop-shadow-md border border-[#D9D9D9]' : ''}`} style={{ backgroundColor: theme.backgroundCards }}>
            {isLoading && <Loader />}
            <div className='flex justify-center items-center p-[16px] sm:min-w-[380px]  bg-gradient-to-r from-[#614385] to-[#516395] rounded-[10px]'>
                <h1 className='font-epilogue font-bolt sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a Campaign</h1>
            </div>
            <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Your Name *"
                        placeHolder="Jhon Doe"
                        inputType="text"
                        value={form.name}
                        hanldeChange={(e) => handleFormFieldChange('name', e)}
                        isDarkModeActive={isDarkModeActive}
                    />
                    <FormField
                        labelName="Campaign Title *"
                        placeHolder="Write a title"
                        inputType="text"
                        value={form.title}
                        hanldeChange={(e) => handleFormFieldChange('title', e)}
                        isDarkModeActive={isDarkModeActive}
                    />
                </div>
                <FormField
                    labelName="Story *"
                    placeHolder="Write your story"
                    isTextArea
                    value={form.description}
                    hanldeChange={(e) => handleFormFieldChange('description', e)}
                    isDarkModeActive={isDarkModeActive}
                />
                <div className="w-full flex justify-start items-center p-4 bg-gradient-to-r from-[#614385] to-[#516395] h-[120px] rounded-[10px]">
                    <img src={money} alt="money" className="w-[40px] h-[40px] object-contain" />
                    <h4 className="font-bold font-epilogue text-[25px] text-white ml-[20px]">
                        You will get the 100% of the raised amount
                    </h4>
                </div>
                <div className="flex flex-wrap gap-[40px]">
                    <FormField
                        labelName="Goal *"
                        placeHolder="ETH 0.50"
                        inputType="text"
                        value={form.target}
                        hanldeChange={(e) => handleFormFieldChange('target', e)}
                        isDarkModeActive={isDarkModeActive}
                    />
                    <FormField
                        labelName="End date *"
                        placeHolder="End date"
                        inputType="date"
                        value={form.deadline}
                        hanldeChange={(e) => handleFormFieldChange('deadline', e)}
                        isDarkModeActive={isDarkModeActive}
                    />
                </div>
                <FormField
                    labelName="Campaign image *"
                    placeHolder="Place image URL of your campaign"
                    inputType="url"
                    value={form.image}
                    hanldeChange={(e) => handleFormFieldChange('image', e)}
                    isDarkModeActive={isDarkModeActive}
                />
                <div className="flex justify-center items-center mt-[40px]">
                    <CustomButton
                        btnType="submit"
                        title="Submit new campaign"
                        styles="bg-[#1dc071]"
                        isDarkModeActive={isDarkModeActive}
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateCampaign