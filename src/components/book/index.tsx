import React, {FC} from 'react';
import s from './book.module.scss'
import {IBook} from "../../api/type";
import {stripText} from "./utils";

export const Book: FC<IBook> = ({accessInfo, volumeInfo}) => {
    return (
        <div className={s.book}>
            <img
                className={s.book__img}
                src={volumeInfo?.imageLinks?.thumbnail || 'error'}
                alt="book"
            />
            <div className={s.book__info}>
                <div className={s.book__top}>
                    <h4 className={s.book__title}>
                        {volumeInfo?.title}
                    </h4>
                    <p className={s.book__text}>
                        {!!volumeInfo.description && stripText(volumeInfo.description, 50)}
                    </p>
                    <p className={s.book__text_light}>
                        By: {volumeInfo?.authors?.join(', ')}
                    </p>
                    <p className={s.book__text}>
                        {volumeInfo?.categories}
                    </p>
                    <p className={s.book__text_light}>
                        Published: {volumeInfo?.publishedDate?.slice(0, 4)}
                    </p>
                </div>
                <a className={s.book__actions}
                   target="_blank"
                   href={volumeInfo?.previewLink}
                   rel="noreferrer"
                >
                    more info
                </a>
            </div>
        </div>
    );
};
