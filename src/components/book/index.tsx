import React, {FC} from 'react';
import s from './book.module.scss'
import {IBook} from "../../api/type";
import {stripText} from "./urils";
export const Book:FC<IBook> = ({accessInfo,volumeInfo}) => {
    return (
        <div className={s.book}>
            <img
                className={s.book__img}
                src={volumeInfo.imageLinks.thumbnail}
                alt="book"
            />
            <div className={s.book__info}>
                <div className={s.book__top}>
                    <h4 className={s.book__title}>
                        {stripText(volumeInfo.title, 100)}
                    </h4>
                    {/*<p className={s.book__text}>*/}
                    {/*    {stripText(*/}
                    {/*        volumeInfo.subtitle*/}
                    {/*            ? volumeInfo.subtitle*/}
                    {/*            : volumeInfo.description,*/}
                    {/*        100*/}
                    {/*    )}*/}
                    {/*</p>*/}
                    <p className={s.book__text_light}>
                        By: {volumeInfo.authors.join(', ')}
                    </p>
                    <p className={s.book__text_light}>
                        Published: {volumeInfo.publishedDate.slice(0, 4)}
                    </p>
                </div>
                <div className={s.book__actions}>
                    <a
                        className="btn btn-primary"
                        target="_blank"
                        href={volumeInfo.previewLink}
                        rel="noreferrer"
                    >
                        read more
                    </a>
                </div>
            </div>
        </div>
    );
};
