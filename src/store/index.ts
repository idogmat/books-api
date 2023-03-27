import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {BooksActionType, booksReducer} from "./booksReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    booksReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionTypes = BooksActionType
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export type AppThunkType<ReturnType=void>=ThunkAction<ReturnType, AppStateType, unknown, AppActionTypes>

// @ts-ignore
window.store = store