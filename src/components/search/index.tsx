import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react';
import {useDispatch} from "react-redux";
import {searchBooksTC, setSearch} from "../../store/booksReducer";
import {useAppSelector} from "../../store";
import s from './input.module.scss'
import {Button} from "../button";
export const Search = () => {
    const dispatch = useDispatch()
    const { search} = useAppSelector(state => state.booksReducer)
    const setValue=(e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearch(e.target.value))
    }
    const searchBooks=()=>{
        dispatch(searchBooksTC())
    }
    return (
        <div className={s.search}>
            <input className={s.search__input} value={search} onChange={setValue} onKeyDown={(e:DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)=>e.key==="Enter" && searchBooks()} type="text"/>
            <Button callBack={searchBooks}>search</Button>
        </div>
    );
};
