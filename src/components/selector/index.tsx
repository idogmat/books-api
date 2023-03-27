import React, {ChangeEvent, FC, useState} from 'react';
interface Types{
    types:string[]
    callBack:(s:string)=>void
}
export const Selector:FC<Types> = ({types,callBack}) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e:ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
        callBack(e.target.value)
    }

    return (
        <select value={selectedOption} onChange={handleChange}>
            {types.map(e=><option key={e} value={e}>{e}</option> )}
        </select>
    );
};
