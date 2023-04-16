import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from '../context';


const CreateCampaign = () => {

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

    const handleFormFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        checkIfImage(form.image, async (exists) => {
            if (exists) {
                setIsLoading(true);
                await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
                setIsLoading(false);
                // navigate('/');
                // console.log(window.thirdWeb);
                // console.log(await window.thirdWeb.eth.net.getId());
                console.log(await window.thirdWeb.eth.net.getNetworkType());
            } else {
                alert('Provide valid image URL')
                setForm({ ...form, image: '' });
            }
        })
    }

    return (
        <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
            {isLoading && 'Loader...'}
            <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
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
                    />
                    <FormField
                        labelName="Campaign Title *"
                        placeHolder="Write a title"
                        inputType="text"
                        value={form.title}
                        hanldeChange={(e) => handleFormFieldChange('title', e)}
                    />
                </div>
                <FormField
                    labelName="Story *"
                    placeHolder="Write your story"
                    isTextArea
                    value={form.description}
                    hanldeChange={(e) => handleFormFieldChange('description', e)}
                />
                <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
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
                    />
                    <FormField
                        labelName="End date *"
                        placeHolder="End date"
                        inputType="date"
                        value={form.deadline}
                        hanldeChange={(e) => handleFormFieldChange('deadline', e)}
                    />
                </div>
                <FormField
                    labelName="Campaign image *"
                    placeHolder="Place image URL of your campaign"
                    inputType="url"
                    value={form.image}
                    hanldeChange={(e) => handleFormFieldChange('image', e)}
                />
                <div className="flex justify-center items-center mt-[40px]">
                    <CustomButton
                        btnType="submit"
                        title="Submit new campaign"
                        styles="bg-[#1dc071]"
                    />
                </div>
            </form>
        </div>
    )
}

export default CreateCampaign