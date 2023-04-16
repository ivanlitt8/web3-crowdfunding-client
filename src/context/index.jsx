import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xACFb5Cd6C795744c8f6aC83a1B7270de94d1b808');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address, // owner
                form.title, // tittle
                form.description,// description
                form.target,// target
                new Date(form.deadline).getTime(), // deadline
                form.image // image
            ]);
            console.log("Contract call success", data)
        } catch (err) {
            console.log("Contract call failure", err)
        }
    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);