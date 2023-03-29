import React, {ChangeEvent, FC, useState} from 'react';
import s from './selector.module.scss'
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
        <div className={s.s}>
        <select className={s.s__selector} value={selectedOption} onChange={handleChange}>
            {types.map(e=><option className={s.s__option} key={e} value={e}>{e}</option> )}
        </select>
        </div>
    );
};
