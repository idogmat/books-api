import React, {FC, ReactNode} from 'react';
import s from './button.module.scss'

interface IButton {
    callBack?: () => void;
    children: ReactNode;
    disabled?: boolean;
}

export const Button: FC<IButton> = ({callBack, children, disabled}): JSX.Element => {
    return (
        <button className={s.btn} onClick={callBack} disabled={disabled}>{children}</button>
    );
};

