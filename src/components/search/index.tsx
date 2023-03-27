import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import {useDispatch} from "react-redux";
import {setBooksTC} from "../../store/booksReducer";

export const Search = () => {
    const [search,setSearch]=useState('')
    const dispatch = useDispatch()
    const setValue=(e:ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }
    const searchBooks=()=>{
        dispatch(setBooksTC(search))
    }
    return (
        <div>
            <input value={search} onChange={setValue} onKeyDown={(e:DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)=>e.key==="Enter" && searchBooks()} type="text"/>
            <button onClick={searchBooks}>search</button>
        </div>
    );
};
