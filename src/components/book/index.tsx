import React, {FC} from 'react';
import s from './book.module.scss'
import {IBook} from "../../api/type";
import {stripText} from "./utils";
import {Link} from "react-router-dom";
import {Button} from "../button";

export const Book: FC<IBook> = ({accessInfo, volumeInfo,id}) => {
    return (
        <div className={s.book}>
            <img
                className={s.book__img}
                src={volumeInfo?.imageLinks?.smallThumbnail || 'error'}
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
                <Button>
                <Link
                   to={`/book/${id}`}
                >
                    more info
                </Link>
                </Button>
            </div>
        </div>
    );
};
