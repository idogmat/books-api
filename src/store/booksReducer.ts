import {AppThunkType} from "./index";
import {booksAPI} from "../api";
import {} from 'redux-thunk/extend-redux';
import {IBook, IResponseBooks} from "../api/type";

export type BooksActionType = ReturnType<typeof setBooks>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setCategory>
    | ReturnType<typeof setOrderBy>
    | ReturnType<typeof setSearch>

export type sortCategoryType= 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry'
export type sortOrderByType= 'relevance' | 'newest'
interface IState {
    search: string,
    sortCategory: sortCategoryType
    sortOrderBy: sortOrderByType
    loading: boolean
    totalItems: number
    books: IBook[]
}

const initialState: IState = {
    search: ' ',
    sortCategory: 'all',
    sortOrderBy: 'relevance',
    loading: false,
    totalItems: 0,
    books: []
}
export const booksReducer = (state = initialState, action: BooksActionType) => {
    switch (action.type) {
        case "SET-BOOKS":
            return {
                ...state,
                totalItems: action.books.totalItems,
                books: action.books.items
            }
        case "LOADING-BOOKS":
            return {
                ...state,
                loading: action.loading
            }
            case "SET-SEARCH":
            return {
                ...state,
                search: action.search
            }
        case "SET-CATEGORY":
            return {
                ...state,
                sortCategory: action.category
            }
        case "SET-ORDER-BY":
            return {
                ...state,
                sortOrderBy: action.orderBy
            }
        default:
            return state
    }

}
const setBooks = (books: IResponseBooks) => ({type: "SET-BOOKS", books}) as const
const setLoading = (loading: boolean) => ({type: "LOADING-BOOKS", loading}) as const
export const setSearch = (search: string) => ({type: "SET-SEARCH", search}) as const
export const setCategory = (category: sortCategoryType) => ({type: "SET-CATEGORY", category}) as const
export const setOrderBy = (orderBy: sortOrderByType) => ({type: "SET-ORDER-BY", orderBy}) as const

export const searchBooksTC = (search: string, subject: string, orderBy: string)
    : AppThunkType =>
    async (dispatch) => {
        dispatch(setLoading(true))
        try {
            let {data} = await booksAPI.getBooks(search, "subject:" + subject, "orderBy=" + orderBy)
            console.log(data)
            dispatch(setBooks(data))
        } catch (e) {
            console.warn(e)
        } finally {
            dispatch(setLoading(false))
        }
    }

