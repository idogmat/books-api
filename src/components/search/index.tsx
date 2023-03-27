import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import {useDispatch} from "react-redux";
import {searchBooksTC, setSearch} from "../../store/booksReducer";
import {useAppSelector} from "../../store";

export const Search = () => {
    const dispatch = useDispatch()
    const { search,sortOrderBy, sortCategory} = useAppSelector(state => state.booksReducer)
    const setValue=(e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearch(e.target.value))
    }
    const searchBooks=()=>{
        dispatch(searchBooksTC(search,sortCategory,sortOrderBy))
    }
    return (
        <div>
            <input value={search} onChange={setValue} onKeyDown={(e:DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)=>e.key==="Enter" && searchBooks()} type="text"/>
            <button onClick={searchBooks}>search</button>
        </div>
    );
};
