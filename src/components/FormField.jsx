import React from 'react'
import { lightTheme, darkTheme } from "../themes/theme";

const FormField = ({ labelName, placeHolder, inputType, isTextArea, value, hanldeChange, isDarkModeActive }) => {

    const theme = isDarkModeActive ? darkTheme : lightTheme;

    return (
        <label className='flex-1 w-full flex flex-col'>
            {labelName && (
                <span className='font-epilogue font-medium text-[14px] leading-[22px] mb-[10px]' style={{ color: isDarkModeActive ? theme.titleColor : theme.titleColor, fontWeight: "bold" }}>{labelName}</span>
            )}
            {isTextArea ? (
                <textarea required value={value} onChange={hanldeChange} rows={10} placeholder={placeHolder} className='py-[15px] sm:px-[25px] px-[15px] outline-none bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]' style={{
                    borderColor: isDarkModeActive ? theme.borderInput : lightTheme.borderInput,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    color: theme.textColor
                }} />
            ) : (
                <input
                    required
                    value={value}
                    onChange={hanldeChange}
                    type={inputType}
                    step="0.1"
                    placeholder={placeHolder}
                    className='py-[15px] sm:px-[25px] px-[15px] outline-none bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]'
                    style={{
                        borderColor: isDarkModeActive ? theme.borderInput : lightTheme.borderInput,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        color: theme.textColor
                    }}
                />
            )}
        </label>
    )
}

export default FormField