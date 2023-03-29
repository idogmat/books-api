import React, {useEffect} from 'react';
import s from './layoutBook.module.scss'
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getCurrentBook} from "../../store/booksReducer";
import {useAppSelector} from "../../store";

export const LayoutBook = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const currentBook = useAppSelector(state=>state.booksReducer.currentBook)
    useEffect(()=>{
        id && dispatch(getCurrentBook(id))
    },[])
    return (
        <div className={s.main} >
           <div className={s.main__imgBlock}>
               <img className={s.main__imgBlock__img} src={currentBook?.volumeInfo?.imageLinks?.thumbnail || 'error'} alt="cover"/>
           </div>
            <div className={s.main__info}>
                <h3>{currentBook?.volumeInfo?.subtitle}</h3>
                <h4>{currentBook?.volumeInfo?.title}</h4>
                <p>{currentBook?.volumeInfo.description}</p>

                <p>Pages:{currentBook?.volumeInfo.pageCount}</p>
            </div>

        </div>
    );
};
