import {AppThunkType} from "./index";
import {booksAPI} from "../api";
import {} from  'redux-thunk/extend-redux';
import {IBook, IResponseBooks} from "../api/type";
export type BooksActionType = ReturnType<typeof setBooks> | ReturnType<typeof setLoading>
const initialState = {
    search:'',
    loading:false,
    totalItems:0,
    books:[] as IBook[]
}
export const booksReducer=(state=initialState,action:BooksActionType)=>{
    switch (action.type){
        case "SET-BOOKS":
            return {
                ...state,
                totalItems:action.books.totalItems,
                books:action.books.items
            }
        case "LOADING-BOOKS":
            return {
                ...state,
                loading:action.loading
            }
        default:
            return state
    }

}
const setBooks = (books:IResponseBooks) => ({type:"SET-BOOKS", books}) as const
const setLoading = (loading: boolean) => ({type:"LOADING-BOOKS", loading}) as const
export const setBooksTC = (search: string): AppThunkType => async (dispatch) => {
        dispatch(setLoading(true))
        try {
            // if (res.data.resultCode === 0) {
            let {data} = await booksAPI.getBooks(search)
            console.log(data)
                dispatch(setBooks(data))
            // }
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch(setLoading(false))
        }
    }

